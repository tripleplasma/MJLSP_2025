import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "../css/Register.css";

const Register = () => {
  const [username, setUsername] = useState(''); // Stores username typed
  const [password, setPassword] = useState(''); // Stores password typed
  const [confirmPassword, setConfirmPassword] = useState(''); // Stores confirmed password typed

  const navigate = useNavigate(); // Used for navigation

  // Submits information to the backend for registration
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // const tryLogin = () => {
    //   fetch('http://localhost:5000/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       username: username,
    //       password: password,
    //       sessionId: localStorage.getItem('userId'),
    //     }),
    //   })
    //   .then(response => {
    //     if(response.status === 200){
    //       onLoginSuccess(); //Callback to change navbar name
    //       navigate('/');
    //     }else if(!response.ok) { console.error("I am Error."); return; }
    //     else return response.json();
    //   })
    //   .catch(err => {
    //     console.error('Error:', err);
    //   });
    // }

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
    </div>
  );
};

export default Register;
