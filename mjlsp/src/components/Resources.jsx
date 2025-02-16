import React, { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';

import '../css/Resources.css';

const Resources = () => {
  const [search, setSearch] = useState(''); // Stores search query to find resources
  const [resources, setResources] = useState([]);
  const navigate = useNavigate()
  // Submits information to backend for login
  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await fetch('http://localhost:8080/LearningResources/getLinks?skill='+search , {
      // mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json()
    setResources(data)
    // .then(response => {
    //   console.log(response.status)      
    //   return response.json();
    // })
    // .then(data => {
    //   setResources(data); // Correctly update state with the API response
    //   console.log(data)
    // })
    // .catch(err => {
    //   console.error('Error:', err);
    // });
  };

  return (
    <div className="resources-container">
      <h2>Find Resources for Topics You'd Like to Learn More About!</h2>
      <text>Search Bar: </text><input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)}></input>
      <br></br>
      <button onClick={handleSubmit}>Search</button>
      <ul>
        {resources.map((link, index) => (
          <li key={index}> {/* Key is important for React's reconciliation */}
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </li>
        ))
        }
      </ul>

    </div>
  );
};

export default Resources;