const connection = require("../config/connection.js");

class DB {
  constructor() {
    this.connection = connection;
  }

  getDepartments() {
    const query = "SELECT department.id, department.name FROM department;";
    return this.connection.promise().query(query);
  }

  getRoles() {
    const query = `
          SELECT
            role.id,
            role.title,
            department.name AS department,
            role.salary
          FROM
            role
            LEFT JOIN department ON role.department_id = department.id;
        `;
    return this.connection.promise().query(query);
  }

  getEmployees() {
    const query = `
      SELECT
        employee.id,
        employee.forename,
        employee.surname,
        role.title,
        department.name AS department,
        role.salary,
        CONCAT(manager.forename, ' ', manager.surname) AS manager
      FROM
        employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id;
    `;
    return this.connection.promise().query(query);
  }

  addDept(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
  }

  roleAdder(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  findAllPossibleManagers(employeeId) {
    const query = `
      SELECT
        id,
        forename,
        surname
      FROM
        employee
      WHERE
        id != ?;
    `;
    return this.connection.promise().query(query, employeeId);
  }

  employeeAdd(employee) {
    const query = "INSERT INTO employee SET ?";
    return this.connection.promise().query(query, [employee]);
  }
  
  removeEmployee(employeeId) {
    const query = "DELETE FROM employee WHERE id = ?";
    return this.connection.promise().query(query, employeeId);
  }

  updateEmployeeRole(employeeId, roleId) {
    const query = "UPDATE employee SET role_id = ? WHERE id = ?";
    return this.connection.promise().query(query, [roleId, employeeId]);
  }
}

const db = new DB();
module.exports = db;
