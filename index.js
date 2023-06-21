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





const addDepartment = async () => {
    try {
        const { name } = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is this Department Called?"
            }
        ]);

        await createDepartment(name);
        console.log(`Department '${name}' established.`);

    } catch (error) {
        console.error('Error occurred:', error);
    }

    startMenu();
};





const addRole = async () => {
    try {
        const [departments] = await findAllDepartments();
        const { title, salary, department_id } = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is this role called?",
            },
            {
                type: "number",
                name: "salary",
                message: "How much does this role pay?",
            },
            {
                type: "list",
                name: "department_id",
                message: "Choose the department for this role.",
                choices: departments,
            },
        ]);


        await createRole({ title, salary, department_id });
        console.log(`The role of '${title}' has been established`);


    } catch (error) {
        console.error("Error occurred:", error);
    }

    startMenu();
};





const addEmployee = async () => {
    try {
      const [roles] = await getRoles();
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
  
      const [employees] = await db.findAllEmployees();
      const managerChoices = employees.map(({ id, forename, surname }) => ({
        name: `${forename} ${surname}`,
        value: id,
      }));
      managerChoices.unshift({ name: "None", value: null });
  
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "forename",
          message: "Enter the person's first name:",
        },
        {
          type: "input",
          name: "surname",
          message: "Enter the person's last name:",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is their role here?",
          choices: roleChoices,
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is their manager?",
          choices: managerChoices,
        },
      ]);
  

      await db.createEmployee(answers.forename, answers.surname, answers.role_id, answers.manager_id);
      console.log(`'${answers.forename} ${answers.surname}' is now on the payroll.`);
    
    
    } catch (error) {
      console.error("Error occurred:", error);
    }
  
    startMenu();
  };
  