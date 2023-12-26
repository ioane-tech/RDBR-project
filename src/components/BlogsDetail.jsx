import React, { useContext, useEffect, useState } from 'react'
import { IoChevronBackCircle } from "react-icons/io5";
import { IoChevronForwardCircleSharp } from "react-icons/io5";

import { token } from '../Token'
import { Link } from 'react-router-dom'
import BlogContext from './context/EachBlogContext'

function BlogsDetail() {
    const {exactBlogId,setExactBlogId}=useContext(BlogContext)  
    
    const [exactBlogData,setExactBlogData]=useState()
    const [blogsData,setBlogsData]=useState()

    const [visibleBlogs, setVisibleBlogs] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

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
      
    setExactBlogId(valueId);
  };

  useEffect(() => {
    const blogIdFromLocalStorage = localStorage.getItem('blogId');
    if (blogIdFromLocalStorage) {
        setExactBlogId(blogIdFromLocalStorage);
    }
}, [setExactBlogId]);

/**********carosuel */
useEffect(() => {
  const endIndex = startIndex + 3;
  const visible = blogsData.slice(startIndex, endIndex);
  setVisibleBlogs(visible);
}, [startIndex, blogsData]);

const handleForwardClick = () => {
  const nextIndex = startIndex + 3;
  if (nextIndex < blogsData.length) {
    setStartIndex(nextIndex);
  }
};

const handleBackwardClick = () => {
  const prevIndex = startIndex - 3;
  if (prevIndex >= 0) {
    setStartIndex(prevIndex);
  }
};
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
          <IoChevronBackCircle className='same_blogs_carosuel_arrow'/>
          <IoChevronForwardCircleSharp className='same_blogs_carosuel_arrow'/>
        </div>

        <div className='same_blogs_container'>
            {
                blogsData &&
                    blogsData.filter((blog) =>
                    blog.categories.some((category) =>
                        exactBlogData.categories.some((exactCategory) => exactCategory.title === category.title)
                    )
                    )
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

        </div>
    </div>
  )
}

export default BlogsDetail