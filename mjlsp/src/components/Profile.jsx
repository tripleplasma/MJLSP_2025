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
    // fetch('http://localhost:8080/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     // username: username,
    //     // password: password
    //   }),
    // })
    // .then(response => {
    //   if(response.status === 200){
    //     alert('Successfully logged in.');
    //     navigate('/postings');
    //   }else if(response.status === 401){
    //     alert('Incorrect user login');
    //   }else{
    //     console.log("Error")
    //   }
    // })
    // .catch(err => {
    //   console.error('Error:', err);
    // });
  };

  return (
    <div className="postings-container">
      <h2>Find out your profile!</h2>
      <text>Keyword (Required):                                                                 </text><input type="text" name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)}></input>
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
      <button onClick={handleSubmit}>Save Profile</button>
      <br></br>
    </div>
  );
};

export default Profile;