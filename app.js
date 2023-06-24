const inquirer = require("inquirer");
const db = require("./db");

// Le start menu and choices
const startMenu = () => {
    import("inquirer")
      .then((inquirer) => {
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
          .then(handleMenuChoice)
          .catch((error) => {
            console.error('Error occurred:', error);
          });
      })
      .catch((error) => {
        console.error('Error occurred while importing inquirer:', error);
      });
  };
  

function handleMenuChoice(answers) {
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
            updateEmpRole();
            break;

        case "Quit":
            console.log("Sayonara!");
            process.exit(0);
    }
}

startMenu();

// Displays available Dept's
function viewDepartments() {
    try {
        const departments = db.getDepartments()[0];
        console.table(departments);
    } catch (error) {
        console.error("Error: ", error);
    }

    return startMenu().then(() => {});
}




// Displays available Roles
function viewRoles() {
    try {
        const roles = db.getRoles()[0];
        console.table(roles);
    } catch (error) {
        console.error("Error occurred:", error);
    }

    return startMenu().then(() => {});
}



// Displays available Employees
function viewEmployees() {
    try {
        const employees = db.getEmployees()[0];
        console.table(employees);
    } catch (error) {
        console.error('Error occurred:', error);
    }

    return startMenu().then(() => {});
}




// Allows the user to add a dept
function addDepartment() {
    try {
        const { name } = inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is this Department Called?"
            }
        ]);

        db.addDept(name);
        console.log(`Department '${name}' established.`);
    } catch (error) {
        console.error('Error occurred:', error);
    }

    return startMenu().then(() => {});
}



// Allows the user to add a new Role
function addRole() {
    try {
        const departments = db.getDepartments()[0];
        const { title, salary, department_id } = inquirer.prompt([
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

        roleAdder({ title, salary, department_id });
        console.log(`The role of '${title}' has been established`);
    } catch (error) {
        console.error("Error occurred:", error);
    }

    return startMenu().then(() => {});
}



// Allows the user to add a new Employee                        check
function addEmployee() {
    try {
        const roles = db.getRoles()[0];
        const employees = db.getEmployees()[0];
        const roster = [...employees];
        roster.unshift({ name: "None", value: null });

        const answers = inquirer.prompt([
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
                choices: roles,
            },
            {
                type: "list",
                name: "manager_id",
                message: "Who is their manager?",
                choices: roster,
            },
        ]);

        db.employeeAdd(answers.forename, answers.surname, answers.role_id, answers.manager_id);
        console.log(`'${answers.forename} ${answers.surname}' is now on the payroll.`);
    } catch (error) {
        console.error("Error occurred:", error);
    }

    return startMenu().then(() => {});
}




// Allows user to update the Employee's role
function updateEmpRole() {
    try {
        const roles = db.getRoles()[0];
        const employees = db.getEmployees()[0];
        const { employeeId, roleId } = inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Who's changing position?",
                choices: employees
            },
            {
                type: "list",
                name: "roleId",
                message: "What's their new role?",
                choices: roles
            }
        ]);

        updateEmpRole(employeeId, roleId);

        const selectedEmployee = employees.find(employee => employee.id === employeeId);
        const selectedRole = roles.find(role => role.id === roleId);
        const { forename, surname } = selectedEmployee;
        const { title } = selectedRole;

        console.log(`${forename} ${surname}'s role is now a '${title}'.`);
    } catch (error) {
        console.error('Error occurred:', error);
    }

    return startMenu().then(() => {});
}