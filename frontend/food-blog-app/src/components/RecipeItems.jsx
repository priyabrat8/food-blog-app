import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { MdAccessTimeFilled, MdEdit, MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RecipeItems() {
  const recipe = useLoaderData();
  const [allRecipes, setAllRecipes] = useState();
  const [isFav, setIsFav] = useState(false);
  let path = window.location.pathname === "/myrecipe" ? true : false;
  let favItem = JSON.parse(localStorage.getItem("fav")) ?? [];
  const navigate = useNavigate();

  useEffect(() => {
    setAllRecipes(recipe);
  }, [recipe]);

  const handleFavorite = (item) => {
    let filterItem = favItem.filter(fav => fav._id !== item._id);
    favItem = favItem.filter(fav => fav._id === item._id).length == 0 ? [...favItem,item] : filterItem;
    localStorage.setItem("fav", JSON.stringify(favItem));
    setIsFav(pre => !pre);
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipes/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                "authorization": "Bearer " +localStorage.getItem("token"),
            }
          }).then((response) => {
            if (response.status === 200) {
              setAllRecipes(allRecipes.filter(item => item._id !== id));
              let filterItem = favItem.filter(fav => fav._id !== id);
              localStorage.setItem("fav", JSON.stringify(filterItem));
              navigate("/myrecipe");
            }
          }).catch((error) => {
            console.error("There was an error fetching the recipe data!", error);
          });
        };


  return (
    <>
    <div className="card-container">
    {
      recipe?.map((item,index) => {
        return(
          <div key={index} className="card">
            <img src={ `http://localhost:5000/images/${item.coverImage}` } alt={item.title} weight={120} height={100} />
            <div className="card-body">
              <Link to={`/recipedetails/${item._id}`}>
              <div className="title">{item.title}</div>
              </Link>
              <div className="icons">
                <div className="timer"><MdAccessTimeFilled /> {item.time}</div>
                {!path ?<FaHeart onClick={() => handleFavorite(item)} style={{color: (favItem).some(res => res._id === item._id) ? "red" : "black"}} /> :
                <div className="action">
                  <Link to={`/editrecipe/${item._id}`} className='editIcon'>
                  <MdEdit />
                  </Link>
                <MdDelete className='deleteIcon' onClick={() => handleDelete(item._id)} />
                </div>}
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
