import '../css/App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import Login from './Login';
import Register from './Register';
import MainPage from './MainPage';

function App() {
  return (
    <Router>
      <div className="App">
          <div className="navbar-container">
            <Navbar/>
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
            </Routes>
          </div>
      </div>
    </Router>
  );
}

function Navbar() { // Receive gemCount as a prop
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </div>
  );
}

export default App;
