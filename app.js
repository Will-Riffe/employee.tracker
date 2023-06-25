const inquirer = require('inquirer');
const db = require("./db");
const connection = require("./config/connection");


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

        case "Add a Role":
            addRole();
            break;

        case "Add an Employee":
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




function viewDepartments() {
    try {
        db.getDepartments().then((departments) => {
            console.table(departments[0]);
            startMenu();
        });
    } catch (error) {
        console.error("Error: ", error);
    }
}





// Displays available Roles
function viewRoles() {
    try {
        db.getRoles().then((rows) => {
            console.table(rows[0]);
            startMenu();
        })
    } catch (error) {
        console.error("Error occurred:", error);
    }
}



// Displays available Employees
function viewEmployees() {
    try {
        db.getEmployees().then((rows) => {
            console.table(rows[0]);
            startMenu();
        })
    } catch (error) {
        console.error('Error occurred:', error);
    }
}




// Allows the user to add a department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: "name",
                message: "What is the name of the department?"
            }
        ])
        .then(answers => {
            let name = answers;
            db.addDept(name)
            console.log(`Department ${name.name} established`)
            startMenu()
        })
}



// Allows the user to add a new Role
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: "title", // Make sure the name matches the input field name
                message: "What is this role called?",
            },
            {
                type: 'input',
                name: "salary",
                message: "How much does this role pay?",
            },
            {
                type: 'input',
                name: "department_id",
                message: "Enter the department ID for this role.",
            },
        ])
        .then(answers => {
            const { title, salary, department_id } = answers;
            const role = { title, salary, department_id };

            db.roleAdder(role)
                .then(() => {
                    console.log(`Added ${role.title} to the database`);
                    startMenu();
                })
                .catch(error => {
                    console.error("Error occurred:", error);
                });
        })
        .catch(error => {
            console.error("Error occurred:", error);
        });
}




// Allows the user to add a new Employee
function addEmployee() {
    try {
        db.getRoles()
            .then((roles) => {
                db.getEmployees()
                    .then((employees) => {
                        const roster = [...employees];
                        roster.unshift({ name: "None", value: null });

                        inquirer.prompt([
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
                        ])
                            .then((answers) => {
                                db.employeeAdd(answers)
                                    .then(() => {
                                        console.log(`'${answers.forename} ${answers.surname}' is now on the payroll.`);
                                        startMenu();
                                    })
                                    .catch((error) => {
                                        console.error("Error occurred:", error);
                                    });
                            })
                            .catch((error) => {
                                console.error("Error occurred:", error);
                            });
                    })
                    .catch((error) => {
                        console.error("Error occurred:", error);
                    });
            })
            .catch((error) => {
                console.error("Error occurred:", error);
            });
    } catch (error) {
        console.error("Error occurred:", error);
    }

    return startMenu().then(() => { });
}




// Allows user to update the Employee's role
function addEmployee() {
    inquirer
        .prompt([
            {
                name: "forename",
                message: "What is the employee's first name?"
            },
            {
                name: "surname",
                message: "What is the employee's last name?"
            }
        ])
        .then(res => {
            let forename = res.forename;
            let surname = res.surname;

            db.getRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                    inquirer
                        .prompt({
                            type: "list",
                            name: "roleId",
                            message: "What is the employee's role?",
                            choices: roleChoices
                        })
                        .then(res => {
                            let roleId = res.roleId;

                            db.getEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerChoices = employees.map(({ id, forename, surname }) => ({
                                        name: `${forename} ${surname}`,
                                        value: id
                                    }));

                                    managerChoices.unshift({ name: "None", value: null });
                                    inquirer
                                        .prompt({
                                            type: "list",
                                            name: "managerId",
                                            message: "Who is the employee's manager?",
                                            choices: managerChoices
                                        })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                forename: forename,
                                                surname: surname
                                            };

                                            db.employeeAdd(employee)
                                                .then(() => {
                                                    console.log(`Added ${forename} ${surname} to the database`);
                                                    startMenu();
                                                })
                                                .catch(error => {
                                                    console.error("Error occurred:", error);
                                                    startMenu();
                                                });
                                        })
                                        .catch(error => {
                                            console.error("Error occurred:", error);
                                            startMenu();
                                        });
                                })
                                .catch(error => {
                                    console.error("Error occurred:", error);
                                    startMenu();
                                });
                        })
                        .catch(error => {
                            console.error("Error occurred:", error);
                            startMenu();
                        });
                })
                .catch(error => {
                    console.error("Error occurred:", error);
                    startMenu();
                });
        })
        .catch(error => {
            console.error("Error occurred:", error);
            startMenu();
        });
}



function  updateEmpRole() {
    db.getEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, forename, surname }) => ({
                name: `${forename} ${surname}`,
                value: id
            }));
            return db.getRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                    return inquirer.prompt([
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
                    ])
                        .then(({ employeeId, roleId }) => {
                            return db.updateEmployeeRole(employeeId, roleId)
                                .then(() => {
                                    const selectedEmployee = employees.find(employee => employee.id === employeeId);
                                    const selectedRole = roles.find(role => role.id === roleId);
                                    const { forename, surname } = selectedEmployee;
                                    const { title } = selectedRole;
                                    console.log(`${forename} ${surname}'s role is now '${title}'.`);
                                })
                                .then(() => startMenu());
                        });
                });
        })
        .catch(error => {
            console.error("Error occurred:", error);
            loadPrompts();
        });
}
