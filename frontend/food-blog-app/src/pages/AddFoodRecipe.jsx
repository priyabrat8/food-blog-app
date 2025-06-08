import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddFoodRecipe() {

    const [recipe, setRecipe] = useState({});
    const navigate = useNavigate();

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/recipes", recipe, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "authorization": "Bearer " +localStorage.getItem("token"),
            }
        }).then(() => {
            navigate("/");
        });
       
    };
    const onHandleChange = (e) => {
        console.log(e.target.name, e.target.value);
        let val = e.target.name == "ingredients" ? e.target.value.split(",") : e.target.name == "file" ? e.target.files[0] : e.target.value;
        setRecipe(pre => ({...pre,[e.target.name]: val}));
    };

  return (
    <>
        <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" onChange={onHandleChange} />
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" onChange={onHandleChange} />
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange} />
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange} />
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="file" onChange={onHandleChange} />
                    </div>
                    <button type="submit">Add Recipe</button>
                </form>
            </div>
    </>
  )
}
