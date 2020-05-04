var mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysqlpassword",
    database: "employeesdb"
});

connection.connect(function(err) {
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    startApp();
});

const start = [
    {
        type: "list",
        name: "likeToDo",
        message: "What would you like to do?",
        choices: ["Add a department", "Add a role", "Add a new employee", "View all employees",]
    },
];

const addNewDepartment = [
    {
        type: "input",
        name: "newDepartment",
        message: "Enter the name of the department:"
    }
];

const addNewRole = [
    {
        type: "input",
        name: "newTitle",
        message: "Enter the name of the role:"
    },
    {
        type: "input",
        name: "newSalary",
        message: "Enter the salary of the role:"
    },
    {
        type: "input",
        name: "departmentID",
        message: "Enter the Department ID # of the role:"
    },
];

const addNewEmployee = [
    {
        type: "input",
        name: "firstName",
        message: "Enter the first name of the employee:"
    },
    {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the employee:"
    },
    {
        type: "input",
        name: "roleID",
        message: "Enter the role ID # of the role:"
    },
    {
        type: "input",
        name: "managerID",
        message: "Enter their manager's ID (if applicable):"
    },
];


function startApp () {
    inquirer.prompt(start).then(answer => {
        switch (answer.likeToDo) {
            case "View all employees":
                viewAll();
                break;

            case "Add a department":
                addDepartment();
                break;

            case "Add a role":
                addRole();
                break;

            case "Add a new employee":
                addEmployee();
                break;
        };
    });
};

function viewAll() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.table(data);
        startApp();
    });
};

function addDepartment() {
    inquirer.prompt(addNewDepartment).then(answer => {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDepartment], function(err, data) {
            if (err) throw err;
            console.log ("Added department: " + answer.newDepartment);
            startApp();
        });
    });
};

function addRole() {
    inquirer.prompt(addNewRole).then(answer => {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.newTitle, answer.newSalary, answer.departmentID], function(err, data) {
            if (err) throw err;
            console.log ("Added new role: " + answer.newTitle);
            console.log ("Salary: " + answer.newSalary);
            console.log ("Department ID: " + answer.departmentID);
            startApp();
        });
    });
};


//Add choice to enter manager id or not
function addEmployee() {
    inquirer.prompt(addNewEmployee).then(answer => {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function(err, data) {
            if (err) throw err;
            console.log ("Added new employee: " + answer.firstName + " " + answer.lastName);
            console.log ("Role ID: " + answer.roleID);
            console.log ("Manager ID: " + answer.managerID);
            startApp();
        });
    });
};
