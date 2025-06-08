import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import MainNavigation from './components/MainNavigation';
import AddFoodRecipe from './pages/AddFoodRecipe';
import EditRecipe from './pages/EditRecipe';
import axios from 'axios';

const getAllRecipes = async () => {
  let allRecipes = []
  await axios.get('http://localhost:5000/recipes').then((response) => {
    allRecipes = response.data;
  })
  return allRecipes;
}

const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let allRecipes =await getAllRecipes();
  if (!user) {
    return [];
  }
  return allRecipes.filter(item => item.createdBy == user.id);
}

  const getFavorites = () => {
    let favItem = JSON.parse(localStorage.getItem("fav")) ?? [];
    return favItem;
  }


const router = createBrowserRouter([
  {path: '/', element: <MainNavigation />, children: [
    {path: '/', element: <Home />, loader: getAllRecipes},
    {path: '/myrecipe', element: <Home />, loader: getMyRecipes},
    {path: '/favorites', element: <Home />, loader: getFavorites},
    {path: '/addrecipe', element: <AddFoodRecipe />},
    {path: '/editrecipe/:id', element: <EditRecipe />},
  ]},
  

])
export default function App() {
  return (
    <>
     <RouterProvider router={router}>
      
     </RouterProvider>
    </>
  );
}
