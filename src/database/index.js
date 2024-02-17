const mysql = require("mysql2")
const CONFIG = require("../config");

const settings = {
    host: CONFIG.DB_HOST,
    user: CONFIG.DB_USER,
    password: CONFIG.DB_PASSWORD,
    database: CONFIG.DB_NAME,
    dateStrings: true
};

const dbConnect = mysql.createConnection(settings);

dbConnect.connect((err) => {
  if (err) {
    console.error("Unable to connect to MySQL:", err)
  } else {
    console.log("Connected to MySQL database")
  }
})

module.exports = dbConnect
