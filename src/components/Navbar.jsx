import React, { useContext, useEffect, useState } from 'react'
import LoginContext from './LoginContext';
import {Link, useLocation} from "react-router-dom"
function Navbar() {
  const { isPopupOpen, 
          setIsPopupOpen, 
          logedIn, 
          setLogedIn,
          aurizedPopup,
          setAuthorizedPopup
        } = useContext(LoginContext);
  const location = useLocation();
  const [addBlogsPage, setAddBlogsPage] = useState(false);
      
  useEffect(() => {
    if(location.pathname === '/add_blogs'){
      setAddBlogsPage(true)
    }
    else if(location.pathname === '/'){
      setAddBlogsPage(false)
    }
  }, [location.pathname]);


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
               <Link to="/add_blogs"><button className='common_button' >დაამატე ბლოგი</button></Link>
               <button className='common_button' onClick={logOutHandler}>გასვლა</button>
              </>
            :
            <>
              <Link to="/"><img src="/img/ArrowBack.png" className='back_icon'/></Link>
            </>  
          }
      </div>
  )
}

export default Navbar