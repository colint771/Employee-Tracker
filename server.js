const mysql = require("mysql2");
const inquirer = require("inquirer");
const conTable = require("console.table");
// const db = require("./db");
const express = require("express");
const app = express();
const PORT = 3308;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "localHost",
    port: 3306,
    user: "root",
    password: "Billions61230",
    database: "employee_info_db"
}, console.log("connection successful to database")
);

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    firstPrompt();
});

function firstPrompt() {
    inquirer
        .prompt({
            type: "list",
            name: "option",
            message: "what do you want to do?",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View departments",
                "View roles",
                "View employees",
                "Update employee role",
                "Quit"
            ],

        }).then(function(results) {
            console.log("You entered: " + results.option);
            switch (results.option) {
                case "Add department": 
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "View departments":
                    viewDepartment();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "View employees":
                    viewEmployees();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                default:
                    quit();
            }
          });
}

function addDepartment(){
    inquirer.prompt({
        type: "input",
        message: "What is the department name?",
        name: "deptName"
    }).then(function(answer){
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            console.log("Department Added!");
            firstPrompt()
        })
    })
}

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the role name?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the salary of this role?",
                name: "salaryTotal"
            },
            {
                type: "input",
                message: "What is the department ID #?",
                name: "deptID"
            }
        ]).then(function(answer) {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
                if (err) throw err;
                console.table(res);
                console.log("Role Added!");
                firstPrompt();
            });
        });
}


function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the first name of the employee?",
          name: "eeFirstName"
        },
        {
          type: "input",
          message: "What's the last name of the employee?",
          name: "eeLastName"
        },
        {
          type: "input",
          message: "What is the employee's role id number?",
          name: "roleID"
        },
        {
          type: "input",
          message: "What is the manager id number?",
          name: "managerID"
        }
      ])
      .then(function(answer) {
  
        
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function(err, res) {
          if (err) throw err;
          console.table(res);
          console.log("Employee Added!");
          firstPrompt();
        });
      });
  }
  
  function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which employee would you like to update?",
          name: "eeUpdate"
        },
  
        {
          type: "input",
          message: "What do you want to update to?",
          name: "updateRole"
        }
      ])
      .then(function(answer) {
  
        connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.eeUpdate],function(err, res) {
          if (err) throw err;
          console.table(res);
          console.log("Employee Updated!");
          firstPrompt();
        });
      });
  }
  
  function viewDepartment() {

    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      console.log("Depatments Viewed!");
      firstPrompt();
    });
  }
  
  function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      console.log("Roles Viewed!");
      firstPrompt();
    });
  }
  
  function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      console.log("Employees Viewed!");
      firstPrompt();
    });
  }
  
  function quit() {
    connection.end();
    process.exit();
  }

  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`));

