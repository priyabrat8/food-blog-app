const Recipes = require('../models/recipe');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname;
    cb(null, filename );
  }
})

const upload = multer({ storage: storage })

const getRecipes = async (req, res) => {
    const recipes = await Recipes.find({});
    res.json(recipes);
}

const getRecipe = async (req, res) => {
    const {id} = req.params;
    const recipe = await Recipes.findById(id);
    res.json(recipe);
}

const addRecipe = async (req, res) => {
    const {title,ingredients,instructions,time} = req.body;
    console.log(req.user);
    
    if(!title || !ingredients || !instructions || !time) {
        return res.status(400).json({msg:"Please provide all required fields"});
    }

    if(!req.user){
        return res.status(400).json({msg:"User not authenticated"});
    }

    const newRecipe = await Recipes.create({
        title,
        ingredients,
        instructions,
        time,
        coverImage: req.file ? req.file.filename : 'default.png',
        createdBy: req.user.id
    });
    return res.json(newRecipe);
}

const updateRecipe = async (req, res) => {
    const {title,ingredients,instructions,time} = req.body;
    try{
    let recipe = await Recipes.findById(req.params.id);
    if(recipe) {
        await Recipes.findByIdAndUpdate(req.params.id, {
            title,
            ingredients,
            instructions,
            time
        }, {new: true});
        res.json({title,
            ingredients,
            instructions,
            time
        });
    }}catch (error) {
        return res.status(404).json({msg:"Recipe not found"});
    }

}

const deleteRecipe = async (req, res) => {
    const {id} = req.params;
    try{
    const recipe = await Recipes.findById(id);
    if(recipe) {
        await Recipes.findByIdAndDelete(id);
        res.json({msg:`Recipe with ID: ${id} deleted successfully`});
    }
} catch (error) {
        return res.status(404).json({msg:"Recipe not found"});
    }
}

module.exports = {
    getRecipes,
    getRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    upload
}