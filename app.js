const inquirer = require("inquirer");
const db = require("./db")







// Le start menu and choices
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
        .then(handleMenuChoice)
        .catch((error) => {
            console.error('Error occurred:', error);
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








/*
      These two functions are called upon in a couple of others
      so I've put them here and called them in a few of their 
      respective functions below
*/
const [roles] = await db.getRoles();
const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
}));


const [employees] = await db.getEmployees();
const employeeChoices = employees.map(({ id, forename, surname }) => ({
    name: `${forename} ${surname}`,
    value: id
}));








// Displays available Dept's
const viewDepartments = async () => {
    try {
        const [departments] = await db.getDepartments();
        console.table(departments);

    } catch (error) {
        console.error("Error: ", error);
    }

    return startMenu().then(() => { });
};




// Displays available Roles
const viewRoles = async () => {
    try {

        const [roles] = await db.getRoles();
        console.table(roles);

    } catch (error) {
        console.error("Error occurred:", error);
    }

    return startMenu().then(() => { });
};




// Displays available Employees
const viewEmployees = async () => {
    try {

        const [employees] = await db.getEmployees();
        console.table(employees);

    } catch (error) {
        console.error('Error occurred:', error);
    }

    return startMenu().then(() => { });
};




// Allows the user to add a dept
const addDepartment = async () => {
    try {
        const { name } = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is this Department Called?"
            }
        ]);

        await db.addDept(name);
        console.log(`Department '${name}' established.`);

    } catch (error) {
        console.error('Error occurred:', error);
    }

    return startMenu().then(() => { });
};




// Allows the user to add a new Role
const addRole = async () => {
    try {
        const [departments] = await db.getDepartments();
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




        await roleAdder({ title, salary, department_id });
        console.log(`The role of '${title}' has been established`);


    } catch (error) {
        console.error("Error occurred:", error);
    }

    return startMenu().then(() => { });
};




// Allows the user to add a new Employee
const addEmployee = async () => {
    try {


        roleChoices();
        employeeChoices();

        roster.unshift({ name: "None", value: null });


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


        await db.employeeAdd(answers.forename, answers.surname, answers.role_id, answers.manager_id);
        console.log(`'${answers.forename} ${answers.surname}' is now on the payroll.`);


    } catch (error) {
        console.error("Error occurred:", error);
    }

    return startMenu().then(() => { });
};




// Allows user to update the Employee's role
const updateEmpRole = async () => {
    try {


        roleChoices();
        employeeChoices();


        const { employeeId, roleId } = await inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Who's changing position?",
                choices: employeeChoices
            },
            {
                type: "list",
                name: "roleId",
                message: "What's their new role?",
                choices: roleChoices
            }
        ]);

        await updateEmpRole(employeeId, roleId);

        const selectedEmployee = employees.find(employee => employee.id === employeeId);
        const selectedRole = roles.find(role => role.id === roleId);
        const { forename, surname } = selectedEmployee;
        const { title } = selectedRole;

        console.log(`${forename} ${surname}'s role is now a '${title}'.`);

    } catch (error) {
        console.error('Error occurred:', error);
    }

    return startMenu().then(() => { });
};
