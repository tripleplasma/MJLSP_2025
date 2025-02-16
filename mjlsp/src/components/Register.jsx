import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "../css/Register.css";

const Register = () => {
  const [username, setUsername] = useState(''); // Stores username typed
  const [password, setPassword] = useState(''); // Stores password typed
  const [confirmPassword, setConfirmPassword] = useState(''); // Stores confirmed password typed
  const navigate = useNavigate()
  // Submits information to the backend for registration
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })
    .then(response => {
        if(response.status === 200){
        //   tryLogin()
            navigate('/postings');
        }else if(!response.ok) { console.error("I am Error."); return; }
        else return response.json();
    })
    .catch(err => {
        console.error('Error:', err);
    });

    //After successfully registering, log the user in
    // fetch('http://localhost:5000/registerUser', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({'username':username,'password':password,'sessionId':localStorage.getItem('userId')}),
    // })
    // .then(response => {
    //     if(response.status === 500) { console.error("User not logged in. Please log in to get tracking"); return; }
    //     else if(response.status === 400) { alert("That user already exists!"); return; }
    //     else if(!response.ok) { console.error("I am Error."); return; }
    //     else if(response.status === 200) 
    //     { 
    //       alert("Account successfully created"); 
    //       tryLogin();
    //     } 
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });

  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
