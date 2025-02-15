import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "../css/Postings.css";

const Postings = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Stores search query

  // Submits information to backend for login
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="postings-container">
      <h2>Find Job Postings that Meet Your Needs!</h2>
      <text>Search: </text><input type="text" name="searchQuery" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
    </div>
  );
};

export default Postings;