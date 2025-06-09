const express = require('express');
const { getRecipes,getRecipe,addRecipe,updateRecipe, deleteRecipe, upload } = require('../controller/recipe');
const verifyToken = require('../middleware/auth');
const router = express.Router();

router.get('/', getRecipes); // Get all recipes
router.get('/:id', getRecipe); // Get a specific recipe by ID
router.post('/', upload.single('file'),verifyToken,addRecipe); // Add a new recipe
router.put('/:id',upload.single('file'),verifyToken, updateRecipe); // Update a specific recipe by ID
router.delete('/:id',verifyToken, deleteRecipe); // Delete a specific recipe by ID
router.use((err, req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = router;