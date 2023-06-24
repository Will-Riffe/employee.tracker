const connection = require('../connection')

class DB {
    constructor() {
      this.connection = connection;
    }

  findAllEmployees() {
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

  createEmployee(employee) {
    const query = "INSERT INTO employee SET ?";
    return this.connection.promise().query(query, employee);
  }

  removeEmployee(employeeId) {
    const query = "DELETE FROM employee WHERE id = ?";
    return this.connection.promise().query(query, employeeId);
  }

  updateEmployeeRole(employeeId, roleId) {
    const query = "UPDATE employee SET role_id = ? WHERE id = ?";
    return this.connection.promise().query(query, [roleId, employeeId]);
  }

  updateEmployeeManager(employeeId, managerId) {
    const query = "UPDATE employee SET manager_id = ? WHERE id = ?";
    return this.connection.promise().query(query, [managerId, employeeId]);
  }

  findAllRoles() {
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

  createRole(role) {
    const query = "INSERT INTO role SET ?";
    return this.connection.promise().query(query, role);
  }

  removeRole(roleId) {
    const query = "DELETE FROM role WHERE id = ?";
    return this.connection.promise().query(query, roleId);
  }

  findAllDepartments() {
    const query = "SELECT department.id, department.name FROM department;";
    return this.connection.promise().query(query);
  }

  viewDepartmentBudgets() {
    const query = `
      SELECT
        department.id,
        department.name,
        SUM(role.salary) AS utilized_budget
      FROM
        employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
      GROUP BY
        department.id,
        department.name;
    `;
    return this.connection.promise().query(query);
  }

  createDepartment(department) {
    const query = "INSERT INTO department SET ?";
    return this.connection.promise().query(query, department);
  }

  removeDepartment(departmentId) {
    const query = "DELETE FROM department WHERE id = ?";
    return this.connection.promise().query(query, departmentId);
  }

  findAllEmployeesByDepartment(departmentId) {
    const query = `
      SELECT
        employee.id,
        employee.forename,
        employee.surname,
        role.title
      FROM
        employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department department ON role.department_id = department.id
      WHERE
        department.id = ?;
    `;
    return this.connection.promise().query(query, departmentId);
  }

  findAllEmployeesByManager(managerId) {
    const query = `
      SELECT
        employee.id,
        employee.forename,
        employee.surname,
        department.name AS department,
        role.title
      FROM
        employee
        LEFT JOIN role ON role.id = employee.role_id
        LEFT JOIN department ON department.id = role.department_id
      WHERE
        manager_id = ?;
    `;
    return this.connection.promise().query(query, managerId);
  }
  
}


const db = new DB();
module.exports = db;