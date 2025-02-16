const mysql = require('mysql2/promise');
require('dotenv').config();


const dbConfig = {
  host: process.env.HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
};

// Create a connection pool (recommended for performance)
const pool = mysql.createPool(dbConfig);

async function getUsers(){
    try {
        // For pool initialization, see above
        const [rows, fields] = await pool.query('SELECT username, password FROM Users');

        console.log(fields)
        // Connection is automatically released when query resolves
    } catch (err) {
        console.log(err);
    }
}
getUsers()