import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { MdAccessTimeFilled } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

export default function RecipeItems() {
  const allRecipes = useLoaderData();
  console.log(allRecipes);
  return (
    <>
    <div className="card-container">
    {
      allRecipes?.map((item,index) => {
        return(
          <div key={index} className="card">
            <img src={ `http://localhost:5000/images/${item.coverImage}` } alt={item.title} weight={120} height={100} />
            <div className="card-body">
              <div className="title">{item.title}</div>
              <div className="icons">
                <div className="timer"><MdAccessTimeFilled /> {item.time}</div>
                <FaHeart />
              </div>
            </div>
          </div>
        )
      })
    }
    </div>
    </>
  )
}
