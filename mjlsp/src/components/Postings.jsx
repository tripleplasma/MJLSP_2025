import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "../css/Postings.css";

const Postings = () => {
  const [keyword, setKeyword] = useState(''); // Stores the keywords with which to search Linkedin
  const [limit, setLimit] = useState(''); // Stores number of postings displayed at any given time
  const [location, setLocation] = useState('');
  const [dateSincePosted, setDateSincePosted] = useState('');
  const [jobType, setJobType] = useState(''); 
  const [remoteFilter, setRemoteFilter] = useState('');
  const [salary, setSalary] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState('');
  
  const [postings, setPostings] = useState([]);

  // sends information to linkedin-job-api
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://10.141.193.55:8081/extract-job-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: keyword,
        limit: limit,
        location: location,
        dateSincePosted: dateSincePosted,
        jobType: jobType,
        remoteFilter: remoteFilter,
        salary: salary,
        experienceLevel: experienceLevel,
        sortBy: sortBy,
        page: page
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      setPostings(data); // Correctly update state with the API response
    })
    .catch(err => {
      console.error('Error:', err);
    });
  };

  return (
    <div className="postings-container">
      <h2>Find Job Postings that Meet Your Needs!</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <input type="text" placeholder="Keyword (Required)" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <input type="text" placeholder="# of Jobs Shown (Required)" value={limit} onChange={(e) => setLimit(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="text" placeholder="Date Since Posted" value={dateSincePosted} onChange={(e) => setDateSincePosted(e.target.value)} />
        <input type="text" placeholder="Job Type (full time, part time, internship)" value={jobType} onChange={(e) => setJobType(e.target.value)} />
        <input type="text" placeholder="Job Format (on site, remote, hybrid)" value={remoteFilter} onChange={(e) => setRemoteFilter(e.target.value)} />
        <input type="text" placeholder="Minimum Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
        <input type="text" placeholder="Experience Level" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} />
        <input type="text" placeholder="Sort By (recent, relevant)" value={sortBy} onChange={(e) => setSortBy(e.target.value)} />
        <input type="text" placeholder="Page (0, 1, 2, etc.)" value={page} onChange={(e) => setPage(e.target.value)} />
        <button type="submit">Find Jobs</button>
      </form>

      <div className="postings-grid">
        {postings.map((job, index) => (
          <a key={index} href={job.jobUrl} target="_blank" rel="noopener noreferrer" className="posting-card">
            <img src={job.companyLogo} alt={`${job.company} logo`} className="company-logo" />
            <h3>{job.position}</h3>
            <p><strong>{job.company}</strong></p>
            <p>{job.location}</p>
            <p>{job.agoTime}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Postings;