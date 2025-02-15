import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); // Stores local username typed
  const [password, setPassword] = useState(''); // Stores local password typed

  // Submits information to backend for login
  const handleSubmit = (event) => {
    event.preventDefault();
    // fetch('http://localhost:5000/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     password: password,
    //     sessionId: localStorage.getItem('userId'),
    //   }),
    // })
    // .then(response => {
    //   if(response.status === 200){
    //     alert('Successfully logged in.');
    //     onLoginSuccess(); //Callback to change navbar name
    //     navigate('/');
    //   }else if(!response.ok) { console.error("I am Error."); return; }
    //   else return response.json();
    // })
    // .catch(err => {
    //   console.error('Error:', err);
    // });
  };

  return (
    <div className="login-container">
      <h2>Please Login:</h2>
    </div>
  );
};

export default Login;

