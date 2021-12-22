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
                addDeparment();
                break;
            case "Add A Role":
                addRole();
                break;
            case "Add An Employee":
                addEngineer();
                break;
            case "Update An Employee":
                addEmployee();
                break;
        }
    })
}








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