const getRecipes = async (req, res) => {
    res.send({msg:"Hello, World!"});
}

const getRecipe = async (req, res) => {
 const {id} = req.params;
 res.json({msg:`Recipe with ID: ${id}`});
}

const addRecipe = async (req, res) => {
    res.json({msg:`Recipe with ID: ${id}`});
}

const updateRecipe = async (req, res) => {
    const {id} = req.params;
    res.json({msg:`Recipe with ID: ${id} updated successfully`});
}

const deleteRecipe = async (req, res) => {
    const {id} = req.params;
    res.json({msg:`Recipe with ID: ${id} deleted successfully`});
}

module.exports = {
    getRecipes,
    getRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe
}