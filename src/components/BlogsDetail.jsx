import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBackCircle } from "react-icons/io5";
import { IoChevronForwardCircleSharp } from "react-icons/io5";

import LoginContext from './context/LoginContext'
import { token } from '../Token'
import { Link } from 'react-router-dom'
import BlogContext from './context/EachBlogContext'
import LoginForm from './LoginForm';

function BlogsDetail() {
  const { 
    isPopupOpen, 
    setIsPopupOpen, 
    logedIn, 
    setLogedIn,
    authorizedPopup,
    setAuthorizedPopup 
  } = useContext(LoginContext);

    const {exactBlogId,setExactBlogId}=useContext(BlogContext)  
    
    const [exactBlogData,setExactBlogData]=useState()
    const [blogsData,setBlogsData]=useState()

    const [visibleRange, setVisibleRange] = useState({ start: 1, end: 3 });



    
///****get info from local storage */
  useEffect(() => {
    const storedAuthorized = localStorage.getItem('authorized');
    if (storedAuthorized === 'true') {
      setLogedIn(true);
    }
  }, []);

///****set info in local storage */
  useEffect(() => {
    localStorage.setItem('authorized', logedIn ? 'true' : 'false');
  }, [logedIn]);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', 
      });
    };

    /*******fetch blogs */
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


    /*****fetch exact blog */
    useEffect(() => {
        fetch(`https://api.blog.redberryinternship.ge/api/blogs/${exactBlogId}`,{
            headers:{
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
            setExactBlogData(data)
          })
          .catch(error => {
            console.error('There is a problem with data fetching:', error);
          });
      }, [exactBlogId]);


  const blogIdHandler = (valueId) => {
    localStorage.setItem('blogId', valueId);
    scrollToTop()
    setExactBlogId(valueId);
  };

  useEffect(() => {
    const blogIdFromLocalStorage = localStorage.getItem('blogId');
    if (blogIdFromLocalStorage) {
        setExactBlogId(blogIdFromLocalStorage);
    }
}, [setExactBlogId]);

/**********carosuel */
const handleForwardClick = () => {
  const newStart = visibleRange.end + 1;
  const newEnd = newStart + 2; // Display the next 3 blogs

  if (newEnd <= blogsData.length) {
    setVisibleRange({ start: newStart, end: newEnd });
  } else if (newStart <= blogsData.length) {
    setVisibleRange({ start: newStart, end: blogsData.length });
  }
};

const handleBackwardClick = () => {
  const newEnd = visibleRange.start - 1;
  const newStart = newEnd - 2;

  if (newStart >= 1) {
    setVisibleRange({ start: newStart, end: newEnd });
  } else if (newEnd >= 1) {
    setVisibleRange({ start: 1, end: newEnd });
  }
};

/*****filter to only have  blogs that have same categories */
const filteredBlogsData = blogsData && blogsData.filter((blog) =>
  blog.categories.some((category) =>
    exactBlogData.categories.some(
      (exactCategory) => exactCategory.title === category.title
    )
  )
);
  const isLastBlogVisible =
    visibleRange.end >= (filteredBlogsData?.length || 0) &&
    (filteredBlogsData?.length || 0) > 0;
  const isFirstBlogVisible = visibleRange.start === 1;

  return (
    <div >

        <div className='blogs_detail_container'>
            {exactBlogData &&
                <>
                    <img className='exact_image' src={exactBlogData.image}/>
                    <h3>{exactBlogData.author}</h3>
                    <p className='exact_date_email'>{exactBlogData.publish_date} • {exactBlogData.email}</p>
                    <p className='exact_title'>{exactBlogData.title}</p>

                    <div className='blog_category_div'>
                        {
                            exactBlogData.categories && 
                            exactBlogData.categories.map((category)=>(
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
                    <p className='exact_description'>{exactBlogData.description}</p>
                </>
            }
        </div>
          

        <div className='same_blogs_header_container'>
          <h3 className='same_blogs_header'>მსგავსი სტატიები</h3>
          <IoChevronBackCircle 
            onClick={handleBackwardClick } 
            className='same_blogs_carosuel_arrow'
            style={{ color: isFirstBlogVisible ? 'rgba(228, 227, 235, 1)' : '' }}
          />
          <IoChevronForwardCircleSharp 
            onClick={isLastBlogVisible ? () => {} : handleForwardClick } 
            className='same_blogs_carosuel_arrow'
            style={{
              cursor: isLastBlogVisible ? 'not-allowed' : 'pointer',
              color: isLastBlogVisible ? 'rgba(228, 227, 235, 1)' : ''
            }}
          />
        </div>

        <div className='same_blogs_container'>
            {
                blogsData &&
                filteredBlogsData
                    .slice(visibleRange.start - 1, visibleRange.end)
                    .map((value,index)=>(
                        <>
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
                        </>
                    ))

            }

          <LoginForm/>
        </div>
    </div>
  )
}

export default BlogsDetail