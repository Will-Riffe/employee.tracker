const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Angry-Antz240',
    database: 'employee_tracker',
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
});


module.exports = connection;
