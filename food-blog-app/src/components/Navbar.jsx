import React, { useEffect } from 'react'
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  let token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = React.useState(token ? true : false);
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  useEffect(()=> {
    setIsLoggedIn(token ? true : false);
    if(token){
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [token])
  
  const checkLogin = () => {
    if(token){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
    }else{
    setIsOpen(true);
    }
  };

  return (
    <>
    <header>
        <h2>Food Blog</h2>
        <ul>
            <li><NavLink to="/">Home</NavLink> </li>
            <li onClick={()=> {!isLoggedIn && setIsOpen(true)}}><NavLink to={isLoggedIn? "/myrecipe" : "/"}>My Recipe</NavLink></li>
            <li onClick={()=> {!isLoggedIn && setIsOpen(true)}}><NavLink to={isLoggedIn?"/favorites" : "/"}>Favourites</NavLink></li>
            <li onClick={checkLogin}><p className='login'>{isLoggedIn ? `Logout (${user.username})` : "Login"}</p></li>
        </ul>
    </header>

    {isOpen && (<Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>)}
    </>
  )
}
