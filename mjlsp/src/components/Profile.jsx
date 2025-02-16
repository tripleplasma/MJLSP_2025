import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Profile.css';

const Profile = () => {
  const [search, setSearch] = useState(''); // Stores search query to find resources
  const [keyword, setKeyword] = useState(''); // Stores the keywords with which to search Linkedin
  const [limit, setLimit] = useState(''); // Stores number of postings displayed at any given time
  const [location, setLocation] = useState('');
  const [dateSincePosted, setDateSincePosted] = useState('');
  const [jobType, setJobType] = useState('');
  const [remoteFilter, setRemoteFilter] = useState('');
  const [salary, setSalary] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const navigate = useNavigate()
  // Submits information to backend for login
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://10.141.193.55:8081/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "userId":localStorage.getItem("userId"),
        "keyword":keyword,
        "location":location,
        "salary":salary,
        "jobType":jobType,
        "remoteFilter":remoteFilter,
        "experience-level":experienceLevel
      }),
    })
    .then(response => {
      if(response.status === 200){
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
    <div class="profile-form-container">
    <form class="profile-form" onSubmit={handleSubmit}>
      <div class="profile-form-group">
        <div class="profile-form-item">
          <label for="position">Position</label>
          <input type="text" id="position" name="position" onChange={(e) => setKeyword(e.target.value)}/>
        </div>
      </div>
      
      <div class="profile-form-group">
        <div class="profile-form-item">
          <label for="location">Location</label>
          <input type="text" id="location" name="location" onChange={(e) => setLocation(e.target.value)}/>
        </div>
      </div>

      <div class="profile-form-group">
        <div class="profile-form-item">
          <label for="job-type">Job Type</label>
          <select id="job-type" name="job-type" onChange={(e) => setJobType(e.target.value)}>
            <option value="full time">Full Time</option>
            <option value="part time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
            <option value="volunteer">Volunteer</option>
            <option value="internship">Internship</option>
          </select>
        </div>
      </div>

      <div class="profile-form-group">
        <div class="profile-form-item">
          <label for="job-format">Job Format</label>
          <select id="job-format" name="job-format" onChange={(e) => setRemoteFilter(e.target.value)}>
            <option value="on site">On Site</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <div class="profile-form-group">
        <div class="profile-form-item">
          <label for="minimum-salary">Minimum Salary</label>
          <input type="number" id="minimum-salary" name="minimum-salary" min="0" onChange={(e) => setSalary(e.target.value)}/>
        </div>
      </div>

      <div class="profile-form-group">
        <div class="profile-form-item">
          <label for="experience-level">Experience Level</label>
          <select id="experience-level" name="experience-level" onChange={(e) => setExperienceLevel(e.target.value)}>
            <option value="internship">Internship</option>
            <option value="entry level">Entry Level</option>
            <option value="associate">Associate</option>
            <option value="senior">Senior</option>
            <option value="director">Director</option>
            <option value="executive">Executive</option>
          </select>
        </div>
      </div>

      <div class="profile-form-submit">
        <button type="submit">Save Profile</button>
      </div>
    </form>
  </div>
  );
};

export default Profile;