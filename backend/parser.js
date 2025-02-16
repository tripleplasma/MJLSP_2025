const express = require("express");
const app = express();
const linkedIn = require("linkedin-jobs-api"); 
const port = 8080;
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function query_and_parse(queryOptions) {
    const jobs = await query(queryOptions);
    console.log(jobs);
    return jobs;
}

async function query(queryOptions) {
    const response = await linkedIn.query(queryOptions);
    return response;
}