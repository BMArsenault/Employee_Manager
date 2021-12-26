const mysql = require('mysql2');
require('dotenv').config();
var inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function promptStart() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee', 'Delete a Department', 'Delete a Role', 'Delete an Employee', 'Update Employee Manager', 'View Budget',],
        }, // based off choices, run func to view or add
    ]).then(answer => {
        switch (answer.options) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add A Department":
                addDepartment();
                break;
            case "Add A Role":
                addRole();
                break;
            case "Add An Employee":
                addEmployee();
                break;
            case "Update An Employee":
                updateEmployee();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Delete a Department":
                deleteDepartment();
                break;
            case "Delete a Role":
                deleteRole();
                break;
            case "Delete an Employee":
                deleteEmployee();
                break;
            case "View Budget":
                viewBudget();
                break;
        }
    })
}

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      promptStart();
    })
})


//READ FUNCTIONS TO VIEW DEPARTMENTS/ROLES/EMPLOYEES
function viewDepartments() {
    db.query(`SELECT id AS "Dept. ID", dept_name AS "Department" FROM departments`, (err, res) => {
        if (err) res.status(500).json({ error: err.message });
        console.table("All Departments:", res);
        promptStart();
    });
};

function viewRoles() {
    db.query(`SELECT id AS "Role ID", title AS "Title", salary AS "Salary", department_id AS "Dept ID" FROM roles`, (err, res) => {
        if (err) res.status(500).json({ error: err.message });
        console.table("All Roles:", res);
        promptStart();
    });
};

function viewEmployees() {
    db.query(`SELECT id AS "Emp. ID", first_name AS "First Name", last_name AS "Last Name", role_id AS "Role ID", manager_id AS "Manager ID" FROM employees`, (err, res) => {
        if (err) res.status(500).json({ error: err.message });
        console.table("All Employees:", res);
        promptStart();
    });
};

function viewBudget() {
    db.query(`SELECT departments.dept_name AS 'Department', SUM(roles.salary) AS 'Budget Per Dept'
    FROM employees
    LEFT JOIN roles on employees.role_id = roles.id
    LEFT JOIN departments on roles.department_id = departments.id
    GROUP BY departments.dept_name;`, 
    (err, res) => {
        if (err) res.status(500).json({ error: err.message });
        console.table("Company Budget:", res);
        promptStart();
    });
};
// // CREATE FUNCTION TO ADD DEPARMENT/ROLE/EMPLOYEE
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?',
        },
 // create a new department
    ]).then(answer => {
        db.query(`INSERT INTO departments SET ?`,
            {
                dept_name: answer.departmentName,
            },
        (err, res) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                console.log(`${res.affectedRows} department has been added!`);
                viewDepartments();
            }
        });
    });
};
//  Add Role
function addRole() {
    db.promise().query(`SELECT id, dept_name AS 'name' FROM departments`).then(data => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of this role?',
            },
            {
                type: 'list',
                name: 'deptID',
                message: 'What is the deparment ID number?',
                choices: data[0]
            },
     // create new role
        ]).then(answer => {
            let deptID = data[0].find(dept => {
                if(dept.name === answer.deptID) {
                    return dept;
                }
            }).id;
            db.query(`INSERT INTO roles SET ?`,
                {
                    title: answer.roleName,
                    salary: answer.salary,
                    department_id: deptID,
                },
            (err, res) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                } else {
                    console.log(`${res.affectedRows} role has been added!`);
                    viewRoles();
                }
            });
        });
    })
   
};
// Add employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of this employee?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is their last name?',
        },
        {
            type: 'list',
            name: 'roleID',
            message: 'What role do this employee belong to?',
            choices: ["1", "2", "3", "4", "5", "6"]
        },
        {
            type: 'list',
            name: 'managerID',
            message: 'What manager do this person work under?',
            choices: ["1", "2", "3", "4"]
        },
 // create new employee
    ]).then(answer => {
        db.query(`INSERT INTO employees SET ?`,
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleID,
                manager_id: answer.managerID
            },
        (err, res) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                console.log(`${res.affectedRows} employee has been added!`);
                viewEmployees();
            }
        });
    });
};

function updateEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeID',
            message: 'Please enter ID of the employee you would like to update:',
        },
        {
            type: 'list',
            name: 'roleID',
            message: 'What is the new role for this employee?',
            choices: ["1", "2", "3", "4", "5", "6"],
        },
    // update employee info
    ]).then((answer) => {
        console.log(answer);
        db.query(`UPDATE employees SET ? WHERE ?`,
            [{
                role_id: answer.roleID,
            },
            {
                id: answer.employeeID,
            }],
        (err, res) => {
            if (err) {
                throw err
        } else {
            console.log(`${res.affectedRows} role has been updated!`);
            viewEmployees();
        }
        });
    });
}

function deleteDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deleteDepartment',
            message: 'What is the ID number of the department you would like to delete?',
        },
 // delete a department
    ])
    .then((answer) => {
        db.query(`DELETE FROM departments
                WHERE ?`,
            {
                id: answer.deleteDepartment,
            },
            // delete department and show all departments for proof
            (err, res) => {
                if (err) {
                    throw err
            } else {
                console.log(`${res.affectedRows} department has been deleted!`);
                viewDepartments();
            }
            });
    }) 
};

function deleteRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deleteRole',
            message: 'What is the ID number of the role you would like to delete?',
        },
 // delete a role
    ])
    .then((answer) => {
        db.query(`DELETE FROM roles
                WHERE ?`,
            {
                id: answer.deleteRole,
            },
            (err, res) => {
                if (err) {
                    throw err
            } else {
                console.log(`${res.affectedRows} role has been deleted!`);
                viewRoles();
            }
            });
    }) 
};

function deleteEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deleteEmp',
            message: 'What is the ID number of the Employee you would like to terminate?',
        },
 // delete a role
    ])
    .then((answer) => {
        db.query(`DELETE FROM employees
                WHERE ?`,
            {
                id: answer.deleteEmp,
            },
            (err, res) => {
                if (err) {
                    throw err
            } else {
                console.log(`${res.affectedRows} employee has been let go!`);
                viewEmployees();
            }
            });
    }) 
};

function updateEmployeeManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeID',
            message: 'Please enter ID of the employee you would like to update:',
        },
        {
            type: 'list',
            name: 'newManagerID',
            message: 'What is the ID of the new manager you would like to assign?',
            choices: ["1", "2", "3", "4",],
        },
    // update employee info
    ]).then((answer) => {
        console.log(answer);
        db.query(`UPDATE employees SET ? WHERE ?`,
            [{
                manager_id: answer.newManagerID,
            },
            {
                id: answer.employeeID,
            }],
        (err, res) => {
            if (err) {
                throw err
        } else {
            console.log(`${res.affectedRows} manager has been updated!`);
            viewEmployees();
        }
        });
    });
}
