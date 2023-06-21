const mysql = require('mysql2');


// est. connection* to db
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const dbConnect = function() {
  return new Promise(function(resolve, reject) {
    connection.connect(function(err) {
      if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        reject(err);
        return;
      }
      console.log('Connected to the database.');
      resolve();
    });
  });
};

// Exporting the connected promise-based connection
module.exports = {
    dbConnect,
    connection
};
