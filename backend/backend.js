const express = require("express");
const app = express();
const linkedIn = require("linkedin-jobs-api"); 
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();
const port = 8080;

const dbConfig = {
  host: process.env.HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
};

// Create a connection pool (recommended for performance)
const pool = mysql.createPool(dbConfig);
const active_users = {}

app.use(express.json());
app.use(cors())

// Middleware to validate the incoming JSON data
const validateRequestData = (data) => {
  const required_fields = [
    "keyword", "limit"
  ];

  const optional_fields = [
    "location", "dateSincePosted", "jobType", "remoteFilter", "salary", 
    "experience-level", "sortBy", "page"
  ];

  for (let field of optional_fields) {
    if (!data[field]) {
      data[field] = "";
    }
  }

  
  for (let field of required_fields) {
    if (!data[field]) {
      return true;
    }
  }
  return null; // No validation errors
};

const validateUserAndPassword = async (data) => {
  const required_fields = [
    "username", "password"
  ];

  let userExists = await userExist(data);

  if (userExists == 0) {
    return false;
  }

  const [rows] = await pool.query(
    "SELECT password FROM Users WHERE username = ? LIMIT 1;",
    [data["username"]]
  );

  if (rows.length === 0 || rows[0].password == data["password"]) {
    return true;
  }
  
  return false; // Validation error
};

const userExist = async (data) => {
  const required_fields = [
    "username"
  ];
  const [exists] = await pool.query("SELECT COUNT(*) FROM Users WHERE username = ?;", [data["username"]]);
  return exists[0]['COUNT(*)'] > 0
};

// GET endpoint to handle the incoming JSON
app.post("/extract-job-info", async (req, res) => {
  try {
    // Extracting the JSON data sent by frontend (the body of the GET request)
    const jsonData = req.body;
    console.log("Received data:", jsonData);

    // Validate the incoming data
    const validationError = validateRequestData(jsonData);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const queryOptions = {
      keyword: jsonData.keyword || "",
      location: jsonData.location || "",
      dateSincePosted: jsonData.dateSincePosted || "",
      jobType: jsonData.jobType || "",
      remoteFilter: jsonData.remoteFilter || "",
      salary: jsonData.salary || "",
      experienceLevel: jsonData.experienceLevel || "",
      limit: jsonData.limit || "",
      sortBy: jsonData.sortBy || "",
      page: jsonData.page || "0",
    };

    const response = await query_and_parse(queryOptions);

    // Send back the response to the frontend
    res.json(response); // Sending the response back as JSON
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.post("/logout", async (req, res) => {
  try {
    // Extracting the JSON data sent by frontend (the body of the GET request)
    const jsonData = req.body;
    console.log("Received data:", jsonData);

    if(jsonData['userId'] in active_users){
      delete active_users.jsonData['userId']
      res.status(200).send("Success");
    }else{
      res.status(401).send("Session Id was not valid")
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// GET endpoint to handle the incoming JSON
// WE USE POST BECAUSE IT ALLOWS US TO SEND BODIES
app.post("/login", async (req, res) => {
  try {
    // Extracting the JSON data sent by frontend (the body of the GET request)
    const jsonData = req.body;
    console.log("Received data:", jsonData);

    // Validate the incoming data
    const validation = await validateUserAndPassword(jsonData);

    if(!validation){
      res.status(401).send("Unauthorized")
    }else{
      res.status(200).send("Success");
      active_users[jsonData['userId']] = jsonData['username']
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// POST endpoint to handle the incoming JSON
app.post("/signup", async (req, res) => {
  try {
    // Extracting the JSON data sent by frontend (the body of the GET request)
    const jsonData = req.body;
    console.log("Signup Received data:", jsonData);

    // Validate the incoming data
    const usernameTaken = await userExist(jsonData);
    if (!usernameTaken) {
      await pool.query("INSERT INTO Users (username, password) VALUES (?, ?);", [jsonData['username'], jsonData['password']])
      res.status(200).send("Register Success")
    }else{
      res.status(400).send("User Already Exist")
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function query_and_parse(queryOptions) {
    const jobs = await query(queryOptions);
    return jobs;
}

async function query(queryOptions) {
    const response = await linkedIn.query(queryOptions);
    return response;
}