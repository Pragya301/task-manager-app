import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import "./Authentication.css";

const Authentication = () => {
  const [active, setActive] = useState("Login");

  const handleChange =() => {
    setActive(active === "Login" ? "Signup" : "Login");
  }

  return (
    <div className='authentication'>
      {active === "Login" ? (<Login />) : (<Signup />)}
      <div className='auth_more'>
        <span>
          {active === "Login" ? (<>Don't have an account ? 
            <button onClick={handleChange}>Sign up</button></>) : (<>Have an account ? 
            <button onClick={handleChange}>Log in</button></>)}
          
        </span>
      </div>
    </div>
  )
}

export default Authentication
