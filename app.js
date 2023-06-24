// Activate: connection.js
const inquirer = require("inquirer");
const connection = require('./connection');


function letsGO() {
    console.log('Employee Tracker, Ready for Input');
    connection();
}

letsGO();