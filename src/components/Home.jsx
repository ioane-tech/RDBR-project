import React, { useContext, useEffect, useState } from 'react'
import {token} from "../Token"
import LoginContext from './context/LoginContext'
import BlogContext from './context/EachBlogContext'

import {Link} from "react-router-dom"
import { IoCloseSharp } from "react-icons/io5";
import { MdError } from "react-icons/md";
import LoginForm from './LoginForm'
function Home() {
  const { 
          isPopupOpen, 
          setIsPopupOpen, 
          logedIn, 
          setLogedIn,
          authorizedPopup,
          setAuthorizedPopup 
        } = useContext(LoginContext);

    const {exactBlogId,setExactBlogId}=useContext(BlogContext)    

    const [selectedCategories, setSelectedCategories] = useState([]);
  
    const [categoriesData,setCategoriesData]=useState()
    const [blogsData,setBlogsData]=useState()
      

  ///****get info from local storage */
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
    if (storedCategories) {
      setSelectedCategories(storedCategories);
    }
  }, []);
  useEffect(() => {
    const storedAuthorized = localStorage.getItem('authorized');
    if (storedAuthorized === 'true') {
      setLogedIn(true);
    }
  }, []);

    ///****set info in local storage */
  useEffect(() => {
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
  }, [selectedCategories]);
  useEffect(() => {
    localStorage.setItem('authorized', logedIn ? 'true' : 'false');
  }, [logedIn]);

       


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
      })
      .catch(error => {
        console.error('There is a problem with data fetching:', error);
      });
  }, []);



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



const blogIdHandler = (valueId) => {
  localStorage.setItem('blogId', valueId);

  setExactBlogId(valueId);
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

                  <Link onClick={()=>blogIdHandler(value.id)} className='blog_open' to="/blog_id">სრულად ნახვა<img src="/img/blogsOpenArrow.png" alt="" /></Link>
                </div>
              ))}
            </>
          )
        }
      </div>
      {/********blogs */}


      {/******Login popup */}
        <LoginForm/>
    </div>
  )
}

export default Home