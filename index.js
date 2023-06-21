const inquirer = require("inquirer");
const { connection, dbconnect } = require("./connection");
const db = require("./db");



async function connectToDatabase() {
    try {
        await dbconnection();
        connectCorrect();
    } catch (error) {
        console.error('CONNECTION ERROR:', error);
    }
}
connectToDatabase();



const startMenu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Choices Available: ',
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add Department",
                    "Add a Role",
                    "Add an Employee",
                    "Update Employee Role",
                    "Quit",
                ]
            }
        ])
        .then((answers) => {
            switch (answers.choice) {

                case "View All Departments":
                    viewDepartments();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "View All Employees":
                    viewEmployees();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add An Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Quit":
                    console.log("Sayonara!");
                    process.exit(0);
            }
        })
        .catch((error) => {
            console.error('Error occurred:', error);
        });
};