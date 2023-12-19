import React from 'react';
import './App.css';
import {Route,Routes,} from "react-router-dom"

import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
      </Routes>
    </div>
  );
}

export default App;
