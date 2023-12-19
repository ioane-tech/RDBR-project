import React, { useEffect, useState } from 'react'
import {token} from "../Token"
function Home() {

  const [categoriesData,setCategoriesData]=useState()
  const [blogsData,setBlogsData]=useState()

  {/*********fetching categories */}
  useEffect(() => {
    fetch('https://api.blog.redberryinternship.ge/api/categories', {
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
 
      })
      .catch(error => {
        console.error('There is a problem with data fetching:', error);
      });
  }, []);
  console.log(blogsData);
  return (
    <div>
        <header className='header_div'>
            <h1 className='home_header'>ბლოგი</h1>
            <img className='home_header_img' src="./img/HomeImg.png" alt="" />
        </header>


        <div className='categories_container'>
          {
            categoriesData &&
            categoriesData.map((value,index)=>(
                <div 
                  className='each_category'
                  style={{backgroundColor:value.background_color, color:value.text_color}}
                >
                  {value.title}
                </div>
            ))
          }
        </div>

      {/********will be complated,just not yet */}
        {
          blogsData==[]?
          (
            <>
            </>
          )
          :
          (
            <>
              <h2>ბლოგები არ არის დამატებული...</h2>
            </>
          )
        }
      {/********will be complated,just not yet */}
    </div>
  )
}

export default Home