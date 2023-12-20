import React, { useContext, useState } from 'react'
import LoginContext from './LoginContext';
import {Link} from "react-router-dom"
function Navbar() {
    const [authorized,setAuthorized]=useState(false)

    const { isPopupOpen, 
            setIsPopupOpen, 
            logedIn, 
            setLogedIn,
            aurizedPopup,
            setAuthorizedPopup
          } = useContext(LoginContext);


    const loginHandler=()=>{
      setIsPopupOpen(true)
    }
    const logOutHandler=()=>{
      setLogedIn(false)
      setAuthorizedPopup(false)
    }
  return (
      <div className='navbar_div'>
          <Link to="/"><img className='logo' src="LOGO.png" alt="" /></Link>
          {
              logedIn==false?
              <button className='common_button' onClick={loginHandler}>შესვლა</button>
              :
              <>
               <Link to="/add_blogs"><button className='common_button' >დაამატე ბლოგი</button></Link>
               <button className='common_button' onClick={logOutHandler}>გასვლა</button>
              </>
          }
      </div>
  )
}

export default Navbar