const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "34.72.78.192", // GCP MySQL instance IP or domain
  user: "root", // Database username
  password: "411impact", // Database password
  database: "uber_db", // Database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
