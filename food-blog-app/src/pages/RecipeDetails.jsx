import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getData = async () => {
      await axios.get(`http://localhost:5000/recipes/${id}`, {
      }).then((response) => {
        setRecipe({title: response.data.title, 
          time: response.data.time,
          ingredients: response.data.ingredients, 
          instructions: response.data.instructions,
           image: response.data.coverImage 
              });        
          }).catch((error) => {
            console.error("There was an error fetching the recipe data!", error);
          });
        };
        getData();
  }, [id]);

  return (
    
    <div className="details">
      <div className="image-container">
        <img src={ `http://localhost:5000/images/${recipe.image}` } alt={recipe.title} />
      </div>
      <div className="info-container">
        <h1>{recipe.title}</h1>
        <p><strong>Time:</strong> {recipe.time}</p>
        <p><strong>Instructions:</strong> {recipe.instructions}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
            {recipe?.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}
