const mysql = require('mysql2');
require('dotenv').config();
var inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const db = require('./db/connection');

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
            message: 'Would you like to add another employee?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee',],
        }, // based off choices, run func to view or add
    ]).then(answer => {
        switch (answer.options) {
            case "View All Department":
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
                addEmplyee();
                break;
            case "Update An Employee":
                updateEmployee();
                break;
        }
    })
}

//READ FUNCTIONS TO VIEW DEPARMENTS/ROLES/EMPLOYEES




// CREATE FUNCTION TO ADD DEPARMENT/ROLE/EMPLOYEE
function addDepartment() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?',
        },
 // create new engineer from answers and push to team array
    ]).then(answers => {
        // const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        // team.push(engineer);
        viewDepartment();
    })
};

//  Add Role
function addRole() {
    return inquirer.prompt([
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
            choices: ['1', '2', '3', '4']
        },
 // create new engineer from answers and push to team array
    ]).then(answers => {
        // const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        // team.push(engineer);
        viewRoles();
    })
};

function addEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of this employee?',
        },
        {
            type: 'input',
            name: 'lastname',
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
 // create new engineer from answers and push to team array
    ]).then(answers => {
        // const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        // team.push(engineer);
        viewEmployees();
    })
};


  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });

  // Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});