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
    const tryLogin = () => {
        fetch('http://localhost:8080/login', {
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
              navigate('/postings');
            }else if(response.status === 401){
              alert('Incorrect user login');
            }else{
              console.log("Error")
            }
          })
          .catch(err => {
            console.error('Error:', err);
          });
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
            alert('Successfully registered in.');
            tryLogin()
        }else if(!response.ok) { console.error("I am Error."); return; }
        else return response.json();
    })
    .catch(err => {
        console.error('Error:', err);
    });
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
