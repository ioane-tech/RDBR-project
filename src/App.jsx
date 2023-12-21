import React from 'react';
import {Route,Routes,} from "react-router-dom"
import Home from './components/Home';
import Navbar from './components/Navbar';
import { PopupProvider } from './components/LoginContext';
import AddBlogs from './components/AddBlogs';

/****styles */
import './CSS/App.css';
import "./CSS/NavbarCss.css"
import "./CSS/home.css"
import "./CSS/addBlogs.css"

function App() {
  return (
    <PopupProvider>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='/add_blogs' element={<AddBlogs/>}/> 
        </Routes>
      </div>
    </PopupProvider>
  );
}

export default App;
