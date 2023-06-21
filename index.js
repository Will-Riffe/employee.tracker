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






const viewDepartments = async () => {
    try {

        const [departments] = await findAllDepartments();
        console.table(departments);

    } catch (error) {
        console.error("Error: ", error);
    }

    startMenu();
};





const viewRoles = async () => {
    try {

        const [roles] = await getRoles();
        console.table(roles);

    } catch (error) {
        console.error("Error occurred:", error);
    }

    startMenu();
};





const viewEmployees = async () => {
    try {

        const [employees] = await findAllEmployees();
                console.table(employees);

    } catch (error) {
        console.error('Error occurred:', error);
    }

    startMenu();
};

