import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Resources.css';

const Resources = () => {
  const [search, setSearch] = useState(''); // Stores search query to find resources
  const [resources, setResources] = useState([]);
  const navigate = useNavigate()
  // Submits information to backend for login
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/LearningResources/getLinks?skill=' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      setResources(data); // Correctly update state with the API response
    })
    .catch(err => {
      console.error('Error:', err);
    });
  };

  return (
    <div className="resources-container">
      <h2>Find Resources for Topics You'd Like to Learn More About!</h2>
      <text>Search Bar: </text><input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)}></input>
      <br></br>
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default Resources;