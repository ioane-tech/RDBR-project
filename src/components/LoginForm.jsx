
import React, { useContext, useEffect, useState } from 'react'
import {token} from "../Token"
import LoginContext from './context/LoginContext'
import BlogContext from './context/EachBlogContext'


import {Link} from "react-router-dom"
import { IoCloseSharp } from "react-icons/io5";
import { MdError } from "react-icons/md";

function LoginForm() {
    const { 
        isPopupOpen, 
        setIsPopupOpen, 
        logedIn, 
        setLogedIn,
        authorizedPopup,
        setAuthorizedPopup 
    } = useContext(LoginContext);
    
    const [email,setEmail]=useState("")
    const [loginError,setLoginError]=useState(false)
    const [errorMessage,setErrorMessage]=useState('')


    const submitHandler=(e)=>{
        e.preventDefault()
        
    
        fetch("https://api.blog.redberryinternship.ge/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorizaion: `Bearer ${token}`
          },
          body: JSON.stringify({ email })
        })
        .then(response => {
          if (response.status!==204) {
            setLoginError(true);
            setErrorMessage("ელ-ფოსტა არ მოიძებნა")
          }
          else{
            setLoginError(false);
            setLogedIn(true);
    
            setAuthorizedPopup(true)
          }
        })
        .catch(error => {
          console.error('Error sending email:', error);
          setLoginError(true);
        });
      }
    

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
    
        if (inputEmail.endsWith('@redberry.ge') || inputEmail==="") {
          setLoginError(false);
          setErrorMessage('');
        } else {
          setLoginError(true);
          setErrorMessage("ელ-ფოსტა უნდა ბოლოვდებოდეს: @redberry.ge")
        }
      };
    
      
    
    const authorizedHandler=()=>{
      setAuthorizedPopup(false)
      setIsPopupOpen(false)
    }
    

  return (
    
    <div>
        {
          isPopupOpen &&
          <>
            <div className='login_background'></div>
            <div className='login_popup'>
              <p className='close_button'><IoCloseSharp onClick={()=>setIsPopupOpen(false)} className='close_button'/></p>
              

              {
                authorizedPopup ===false &&
                <>
                  <p className='Login_header'>შესვლა</p>
                <label className='login_label' htmlFor="email">ელ-ფოსტა</label>
                <input 
                  style={
                    {
                      backgroundColor:loginError && "rgba(250, 242, 243, 1)", 
                      borderColor: loginError && 'rgba(234, 25, 25, 1)'
                    }
                  }
                  className='login_input' 
                  type="email" name="email" 
                  required 
                  placeholder='Example@redberry.ge '
                  onChange={(e)=>handleEmailChange(e)}
                />
                {
                  loginError &&
                  <p className='login_error'><MdError className='error_icon'/><span>{errorMessage}</span></p>
                }
                <button onClick={(e)=>submitHandler(e,email)} className='login_submit'>შესვლა</button>
                </>
              }
              
              {
                authorizedPopup===true &&
                <>
                  <div style={{marginLeft:"auto",marginRight:'auto'}}>
                    <img className='succsess_img' src='./img/succsessImg.png'/>
                  </div>
                  <p className='authorized_text'>წარმატებული ავტორიზაცია</p>
                  <button onClick={authorizedHandler} className='login_submit'>კარგი</button>
                </>
              }
            </div>
          </>

        }
    </div>
  )
}

export default LoginForm