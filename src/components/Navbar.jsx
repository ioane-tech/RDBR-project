import React, { useContext, useState } from 'react'
import LoginContext from './LoginContext';
import {Link} from "react-router-dom"
function Navbar() {
  const { isPopupOpen, 
          setIsPopupOpen, 
          logedIn, 
          setLogedIn,
          aurizedPopup,
          setAuthorizedPopup
        } = useContext(LoginContext);
  const [addBlogsPage,setAddBlogsPage]=useState(false)


  const loginHandler=()=>{
    setIsPopupOpen(true)
  }
  const logOutHandler=()=>{
    setLogedIn(false)
    setAuthorizedPopup(false)
  }

  return (
      <div className='navbar_div'>
              <Link onClick={()=>setAddBlogsPage(false)} to="/">
                <div style={{marginLeft:addBlogsPage && "810px"}} className='navigate_to_home'></div>
              </Link>
              <img style={{marginLeft:addBlogsPage && "auto"}} className='logo' src="LOGO.png" alt="" />
          {
            addBlogsPage==false?
              logedIn==false?
              <button className='common_button' onClick={loginHandler}>შესვლა</button>
              :
              <>
               <Link onClick={()=>setAddBlogsPage(true)} to="/add_blogs"><button className='common_button' >დაამატე ბლოგი</button></Link>
               <button className='common_button' onClick={logOutHandler}>გასვლა</button>
              </>
            :
            <>
              <Link onClick={()=>setAddBlogsPage(false)} to="/"><img src="/img/ArrowBack.png" className='back_icon'/></Link>
            </>  
          }
      </div>
  )
}

export default Navbar