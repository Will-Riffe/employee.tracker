require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2/promise');


// Read the schema file
const schemaFile = fs.readFileSync('./db/schema.sql', 'utf8');

// Read the seeds file
const seedsFile = fs.readFileSync('./db/seeds.sql', 'utf8');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }

    console.log('Database Connected.');

    // Run Schema.sql
    connection.query(schemaFile, (err, results) => {
        if (err) {
            console.error('Schema Failed: ', err);
            connection.end();
            return;
        }

        console.log('Schema Executed');

        connection.query(seedsFile, (err, results) => {
            if (err) {
                console.error('Error in Seeding: ', err);
                connection.end();
                return;
            }

            console.log('Seeds were Spread');
            connection.end();
        });
    });
});

module.exports = connection;
