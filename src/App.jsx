import React from 'react';
import {Route,Routes,} from "react-router-dom"
import Home from './components/Home';
import Navbar from './components/Navbar';
import { PopupProvider } from './components/context/LoginContext';
import { EachBlogProvider } from './components/context/EachBlogContext';

import AddBlogs from './components/AddBlogs';

/****styles */
import './CSS/App.css';
import "./CSS/NavbarCss.css"
import "./CSS/home.css"
import "./CSS/addBlogs.css"
import "./CSS/blogsDetail.css"

import BlogsDetail from './components/BlogsDetail';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <PopupProvider>
      <EachBlogProvider>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/> 
            <Route path='/add_blogs' element={<AddBlogs/>}/> 
            <Route path='blog_id' element={<BlogsDetail/>}/>
            <Route path='/*' element={<ErrorPage/>}/>
          </Routes>
        </div>
      </EachBlogProvider>
    </PopupProvider>
  );
}

export default App;
