import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditRecipe() {

  const {id} = useParams();
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
        const getData = async () => {
          await axios.get(`http://localhost:5000/recipes/${id}`, {
          }).then((response) => {
            setRecipe({title: response.data.title, 
              time: response.data.time,
              ingredients: response.data.ingredients.join(","), 
              instructions: response.data.instructions, 
              });
          }).catch((error) => {
            console.error("There was an error fetching the recipe data!", error);
          });
        };
        getData();
  }, [id]);

    
    const navigate = useNavigate();

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/recipes/${id}`, recipe, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "authorization": "Bearer " +localStorage.getItem("token"),
            }
        }).then(() => {
            navigate("/myrecipe");
        });
       
    };
    const onHandleChange = (e) => {
        let val = e.target.name == "ingredients" ? e.target.value.split(",") : e.target.name == "file" ? e.target.files[0] : e.target.value;
        setRecipe(pre => ({...pre,[e.target.name]: val}));
    };

  return (
    <>
        <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" value={recipe.title} className='input' name="title" onChange={onHandleChange} />
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" value={recipe.time} className='input' name="time" onChange={onHandleChange} />
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea type="text" value={recipe.ingredients}  className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange} />
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea type="text" value={recipe.instructions} className='input-textarea' name="instructions" rows="5" onChange={onHandleChange} />
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="file" onChange={onHandleChange} />
                    </div>
                    <button type="submit">Edit Recipe</button>
                </form>
            </div>
    </>
  )
}
