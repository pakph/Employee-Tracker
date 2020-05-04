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
        choices: ["Add a department", "View all employees", "View all employees by department"]
    },
];

const addNewDepartment = [
    {
        type: "input",
        name: "newDepartment",
        message: "Enter the name of the department:"
    }
]


function startApp () {
    inquirer.prompt(start).then(answer => {
        switch (answer.likeToDo) {
            case "View all employees":
                viewAll();
                break;

            case "Add a department":
                addDepartment();
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





