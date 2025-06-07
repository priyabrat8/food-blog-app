import React from 'react'
import RecipeItems from '../components/RecipeItems'
import foodImg from "../assets/foodRecipe.png";

export default function Home() {
  return (
    <>
    
    <section className="home">
        <div className="left">
            <h1>Food Recipes</h1>
            <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus error voluptatibus architecto officia magnam dolorem adipisci sint facilis iure ipsam at fuga ducimus, accusamus aliquid? Delectus voluptate rem voluptas minima!</h5>
            <button>Share your recipe</button>
        </div>
        <div className="right">
            <img src={foodImg} width="320px" height="300px" alt="Food Recipes" />
        </div>
    </section>

    <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,192L40,170.7C80,149,160,107,240,80C320,53,400,43,480,58.7C560,75,640,117,720,165.3C800,213,880,267,960,266.7C1040,267,1120,213,1200,192C1280,171,1360,181,1400,186.7L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>    
    </div>
    
    <div className="recipe">
      <RecipeItems />
    </div>
    </>
  )
}
