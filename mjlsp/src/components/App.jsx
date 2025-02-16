import '../css/App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import Login from './Login';
import Register from './Register';
import MainPage from './MainPage';
import Postings from './Postings';
import Resources from './Resources';
import Profile from './Profile';

function App() {

  const [username, setUsername] = useState(null); // State to store login status

  useEffect(() => {
    let userId = localStorage.getItem('userId');
  
    // if userId/sessionId does not exist, generate a value for it and set it in local storage
    if(userId === null || userId === "null") {
      userId = uuidv4();
      localStorage.setItem('userId', userId);
    }
  }, [])

  const logout = (event) => {
    event.preventDefault();
    //There could be a bug where a user could fake leave, then come back
    if(localStorage.getItem('userId')){
      fetch(`http://localhost:8080/logout`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId')
        }),
      })
      .then(response => {
        if(response.ok){
          setUsername(null)
        } else if(!response.ok) { 
          console.error("I am Error."); return; 
        }
      })
      .catch(err => {
        console.error("Error fetching user details:", err);
      });
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', logout);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', logout);
    };
  }, []);

  const ProtectedRoute = ({isLoggedIn, children }) => {
    return isLoggedIn != null ? children : <Navigate to="/login" />;
  };
  
  return (
    <Router>
      <div className="App">
        <div className="ribbon">
          <Link to="/">
            <img className="logo" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgEmXtfhMS5Ubv_Qemg1CFlrEH-NsPgaPiTg&s"}></img>
          </Link>
          <div className="auth-buttons">
            <Link to="/postings" className="button">Postings</Link>
            <Link to="/resources" className="button">Resources</Link>
            {username == null ?
              <Link to="/register" className="button">Register</Link>
              : 
              <div className='button' onClick={logout}>Logout</div>
            }
            {username == null ?
              (<Link to="/login" className="button">Login</Link>)
              : 
              (<Link to="/profile" className='button'>{username}</Link>) 
            }
          </div>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<Login setLoginUsername={setUsername}/>} />
            <Route path="/register" element={<Register setLoginUsername={setUsername}/>} />
            <Route path="/postings" element={<Postings/>} />
            <Route path="/resources" element={<Resources/>} />
            <Route path="/profile" element={
              <ProtectedRoute isLoggedIn={username}>
                <Profile/>
              </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
