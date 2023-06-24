const inquirer = require("inquirer");



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
  





// Displays available Dept's                            check
const viewDepartments = async () => {
    try {
        const [departments] = await getDepartments();
        console.table(departments);

    } catch (error) {
        console.error("Error: ", error);
    }

    return startMenu().then(() => {});
};





// Displays available Roles                              check
const viewRoles = async () => {
    try {

        const [roles] = await getRoles();
        console.table(roles);

    } catch (error) {
        console.error("Error occurred:", error);
    }

    return startMenu().then(() => {});
};




// Displays available Employees                             check
const viewEmployees = async () => {
    try {

        const [employees] = await getEmployees();
        console.table(employees);

    } catch (error) {
        console.error('Error occurred:', error);
    }

    return startMenu().then(() => {});
};




// Allows the user to add a dept                             check
const addDepartment = async () => {
    try {
        const { name } = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is this Department Called?"
            }
        ]);

        await addDept(name);
        console.log(`Department '${name}' established.`);

    } catch (error) {
        console.error('Error occurred:', error);
    }

    return startMenu().then(() => {});
};




// Allows the user to add a new Role                          check
const addRole = async () => {
    try {
        const [departments] = await getDepartments();
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

    return startMenu().then(() => {});
};




// Allows the user to add a new Employee                        check
const addEmployee = async () => {
    try {


      const [roles] = await getRoles();
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
  

      const [employees] = await getEmployees();
      const roster = employees.map(({ id, forename, surname }) => ({
        name: `${forename} ${surname}`,
        value: id,
      }));


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
  

      await employeeAdd(answers.forename, answers.surname, answers.role_id, answers.manager_id);
      console.log(`'${answers.forename} ${answers.surname}' is now on the payroll.`);
    
    
    } catch (error) {
      console.error("Error occurred:", error);
    }
  
    return startMenu().then(() => {});
  };
  



// Allows user to update the Employee's role
  const updateEmpRole = async () => {
    try {

        const [employees] = await getEmployees();
        const employeeChoices = employees.map(({ id, forename, surname }) => ({
            name: `${forename} ${surname}`,
            value: id
        }));



        const [roles] = await getRoles();
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));



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

    return startMenu().then(() => {});
};


startMenu();