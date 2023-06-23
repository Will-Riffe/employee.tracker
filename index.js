const inquirer = require("inquirer");
const { connection, dbConnect } = require("./connection");
const fs = require("fs");



async function dbConnect() {
    try {
        await connection.connect();

        console.log('Database connected.');

        const schema = fs.readFileSync('schema.sql', 'utf8');
        await connection.query(schema);

        console.log('Established Schema');

        const seeds = fs.readFileSync('seeds.sql', 'utf8');
        await connection.query(seeds);

        console.log('Spread Seeds');


        connectCorrect();


    } catch (error) {
        console.error('CONNECTION ERROR:', error);
    }
}



dbConnect();

