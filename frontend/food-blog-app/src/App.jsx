import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import MainNavigation from './components/MainNavigation';
import axios from 'axios';

const getAllRecipes = async () => {
  let allRecipes = []
  await axios.get('http://localhost:5000/recipes').then((response) => {
    allRecipes = response.data;
  })
  return allRecipes;
}


const router = createBrowserRouter([
  {path: '/', element: <MainNavigation />, children: [
    {path: '/', element: <Home />, loader: getAllRecipes},
    {path: '/myRecipes', element: <Home />},
    {path: '/favRecipes', element: <Home />},
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
