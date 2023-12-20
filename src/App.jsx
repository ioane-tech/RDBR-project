import React from 'react';
import './App.css';
import {Route,Routes,} from "react-router-dom"
import Home from './components/Home';
import Navbar from './components/Navbar';
import { PopupProvider } from '../src/components/LoginContext';
import AddBlogs from './components/AddBlogs';

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
