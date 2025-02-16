import '../css/App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import Login from './Login';
import Register from './Register';
import MainPage from './MainPage';
import Postings from './Postings';
import Resources from './Resources';

function App() {
  return (
    <Router>
      <div className="App">
          <div className="logo-container">
            <Link to="/">
              <div className="logo-container">
                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgEmXtfhMS5Ubv_Qemg1CFlrEH-NsPgaPiTg&s"} style={{width:75, height:75}}></img>
              </div>
            </Link>
          </div>
          <div className="navbar-container">
            <Navbar/>
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/postings" element={<Postings/>} />
              <Route path="/resources" element={<Resources/>} />
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
        <Link to="/"></Link>
        {"      "}
        <Link to="/login">Login</Link>
        {"      "}
        <Link to="/register">Register</Link>
        {"      "}
        <Link to="/postings"> Job Postings</Link>
        {"      "}
        <Link to="/resources"> Find Resources</Link>
      </nav>
    </div>
  );
}

export default App;
