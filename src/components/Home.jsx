import React, { useContext, useEffect, useState } from 'react'
import {token} from "../Token"
import LoginContext from './LoginContext'

import {Link} from "react-router-dom"
import { IoCloseSharp } from "react-icons/io5";
import { MdError } from "react-icons/md";
function Home() {
  const { 
          isPopupOpen, 
          setIsPopupOpen, 
          logedIn, 
          setLogedIn,
          authorizedPopup,
          setAuthorizedPopup 
        } = useContext(LoginContext);
        
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [categoriesData,setCategoriesData]=useState()
  const [blogsData,setBlogsData]=useState()

  const [email,setEmail]=useState("")
  const [loginError,setLoginError]=useState(false)
  const [errorMessage,setErrorMessage]=useState('')

  {/*********fetching categories */}
  useEffect(() => {
    fetch('https://api.blog.redberryinternship.ge/api/categories')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('response status was not ok.');
      })
      .then(data => {
        setCategoriesData(data.data)
        console.log(data.data);
      })
      .catch(error => {
        console.error('There is a problem with data fetching:', error);
      });
  }, []);

  {/*********fetching blogs */}
  useEffect(() => {
    fetch('https://api.blog.redberryinternship.ge/api/blogs', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('response status was not ok.');
      })
      .then(data => {
        setBlogsData(data.data)
        console.log(data.data)
      })
      .catch(error => {
        console.error('There is a problem with data fetching:', error);
      });
  }, []);


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
      if (response.status!=204) {
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


{/*****email validation ****/}
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


{/**********categories select */}
const toggleCategory = (id, title) => {
  const categoryIndex = selectedCategories.findIndex((cat) => cat.id === id);

  if (categoryIndex === -1) {
    setSelectedCategories([...selectedCategories, { id, title }]);
  } else {
    const updatedCategories = [...selectedCategories];
    updatedCategories.splice(categoryIndex, 1);
    setSelectedCategories(updatedCategories);
  }
};

  return (
    <div>
        <header className='header_div'>
            <h1 className='home_header'>ბლოგი</h1>
            <img className='home_header_img' src="./img/HomeImg.png" alt="" />
        </header>

      {/*categories*/}
        <div className='categories_container'>
          {
            categoriesData &&
            categoriesData.map((value)=>(
              <div
              key={value.id}
              className='each_category'
              style={{
                backgroundColor: value.background_color,
                color: value.text_color,
                border: selectedCategories.some((cat) => cat.id === value.id) ? '1px solid black' : 'none',
              }}
              onClick={() => toggleCategory(value.id, value.title)}
            >
                  {value.title}
                </div>
            ))
          }
        </div>

      {/********blogs*/}
      <div className='blogs_container'>
        {
          blogsData===[]?
          (
            <>
              <h2>ბლოგები არ არის დამატებული...</h2>
            </>
          )
          :
          (
            <>
              {blogsData && blogsData
                   //date filter
                  .filter((value) => {
                    const publishDate = new Date(value.publish_date);
                    const currentDate = new Date();
                    return publishDate <= currentDate;
                  })
                  .filter((value) => {
                    //selected categories filter
                    if (selectedCategories.length === 0) {
                      return true; 
                    } else {
                      return value.categories.some((category) =>
                        selectedCategories.some(
                          (selectedCategory) => selectedCategory.title === category.title
                        )
                      );
                    }
                  })
                  .map((value,index)=>(
                    <div key={index} className='each_blog_container'>
                      <img className='blog_img' src={value.image} alt="" />
                      <h3>{value.author}</h3>
                      <p className='blog_date'>{value.publish_date}</p>
                      <p className='blog_title'>{value.title}</p>

                      <div className='blog_category_div'>
                        {
                          value.categories && 
                          value.categories.map((category)=>(
                            <>
                              <div 
                                className='blog_each_category'
                                style={{backgroundColor:category.background_color,color:category.text_color }}
                              >
                                {category.title}
                              </div>
                            </>
                        ))
                      }
                  </div>

                  <p className='blog_description'>{value.description}</p>

                  <Link className='blog_open' to="/blog_id">სრულად ნახვა<img src="/img/blogsOpenArrow.png" alt="" /></Link>
                </div>
              ))}
            </>
          )
        }
      </div>
      {/********blogs */}


      {/******Login popup */}
        {
          isPopupOpen &&
          <>
            <div className='login_background'></div>
            <div className='login_popup'>
              <p className='close_button'><IoCloseSharp onClick={()=>setIsPopupOpen(false)} className='close_button'/></p>
              

              {
                authorizedPopup ==false &&
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
                authorizedPopup==true &&
                <>
                  <img className='succsess_img' src='./img/succsessImg.png'/>
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

export default Home