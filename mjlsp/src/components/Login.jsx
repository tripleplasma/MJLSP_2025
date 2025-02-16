import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Login.css';

const Login = ({setLoginUsername}) => {
  const [username, setUsername] = useState(''); // Stores local username typed
  const [password, setPassword] = useState(''); // Stores local password typed
  const navigate = useNavigate()
  // Submits information to backend for login
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://10.141.193.55:8081/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        userId: localStorage.getItem('userId')
      }),
    })
    .then(response => {
      if(response.status === 200){
        setLoginUsername(username)
        alert('Successfully logged in.');
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
  };

  return (
    <div className="login-container">
      <h2>Login:</h2>
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
        <button className="enter-button" type="submit">ENTER</button>
      </form>
    </div>
  );
};

export default Login;

