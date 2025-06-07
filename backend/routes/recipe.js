const express = require('express');
const { getRecipes,getRecipe,addRecipe,updateRecipe, deleteRecipe, upload } = require('../controller/recipe');
const router = express.Router();

router.get('/', getRecipes); // Get all recipes
router.get('/:id', getRecipe); // Get a specific recipe by ID
router.post('/', upload.single('file'),addRecipe); // Add a new recipe
router.put('/:id', updateRecipe); // Update a specific recipe by ID
router.delete('/:id', deleteRecipe); // Delete a specific recipe by ID

module.exports = router;