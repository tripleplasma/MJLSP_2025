const express = require("express");
const app = express();
const linkedIn = require("linkedin-jobs-api"); 
const mysql = require('mysql2/promise');
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

app.use(express.json());

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

  userExists = await validateUser(data);

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

const validateUser = async (data) => {
  const required_fields = [
    "username"
  ];

  const [exists] = await pool.query("SELECT EXISTS(SELECT 1 FROM Users WHERE username = ?) AS userExists;", [data["username"]]);
  
  if (exists[0].userExists == 1) {
    return true;
  }
  
  return false; // Validation error
};

// GET endpoint to handle the incoming JSON
app.get("/extract-job-info", async (req, res) => {
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

// GET endpoint to handle the incoming JSON
app.get("/login", async (req, res) => {
  try {
    // Extracting the JSON data sent by frontend (the body of the GET request)
    const jsonData = req.body;
    console.log("Received data:", jsonData);

    // Validate the incoming data
    const validation = await validateUserAndPassword(jsonData);

    // Send back the response to the frontend
    res.json(validation); // Sending the response back as JSON
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
    console.log("Received data:", jsonData);

    // Validate the incoming data
    const validation = await validateUser(jsonData);

    var added = false
    if (validation == false) {
      await pool.query("INSERT INTO Users (username, password) VALUES (?, ?);", [jsonData['username'], jsonData['password']])
      added = true;
    } 

    // Send back the response to the frontend
    res.json(added); // Sending the response back as JSON
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