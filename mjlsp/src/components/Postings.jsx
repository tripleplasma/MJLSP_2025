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
    fetch('http://localhost:8080/extract-job-info', {
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
      <text>Keyword (Required):                                                                 </text><input type="text" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}></input>
      <br></br>
      <text>Number of Postings Shown (Required):                                                </text><input type="text" name="limit" value={limit} onChange={(e) => setLimit(e.target.value)}></input>
      <br></br>
      <text>Location:                                                                           </text><input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)}></input>
      <br></br>
      <text>Date Since Posted (past month, past week, 24hr):                                    </text><input type="text" name="dateSincePosted" value={dateSincePosted} onChange={(e) => setDateSincePosted(e.target.value)}></input>
      <br></br>
      <text>Job Type (full time, part time, contract, temporary, volunteer, internship):        </text><input type="text" name="jobType" value={jobType} onChange={(e) => setJobType(e.target.value)}></input>
      <br></br>
      <text>Job Format (on site, remote, hybrid):                                               </text><input type="text" name="remoteFilter" value={remoteFilter} onChange={(e) => setRemoteFilter(e.target.value)}></input>
      <br></br>
      <text>Minimum Salary (40000, 60000, 80000, 100000, 120000):                               </text><input type="text" name="salary" value={salary} onChange={(e) => setSalary(e.target.value)}></input>
      <br></br>
      <text>Experience Level (internship, entry level, associate, senior, director, executive): </text><input type="text" name="experienceLevel" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}></input>
      <br></br>
      <text>Sort By (recent, relevant):                                                         </text><input type="text" name="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}></input>
      <br></br>
      <text>Page (0, 1, 2, etc.):                                                               </text><input type="text" name="page" value={page} onChange={(e) => setPage(e.target.value)}></input>
      <br></br>
      <button onClick={handleSubmit}>Find Jobs</button>
      <br></br>
      <br></br>
      <div className="job-list">
        {postings.length > 0 ? (
          postings.map((job, index) => (
            <div key={index} className="job-card">
              <img src={job.companyLogo} alt={`${job.company} Logo`} />
              <h3>{job.position}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Date Posted:</strong> {job.date}</p>
              <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">View Job</a>
              <br></br>
            </div>
          ))
        ) : (
          <p>No job postings found.</p>
        )}
      </div>
    </div>
  );
};

export default Postings;