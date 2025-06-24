import React from 'react'
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
  return (
    <div className='error-container'> 
    <TbError404 />
    <h1>Page Not Found!</h1>
    </div>
  )
}
