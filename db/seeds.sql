INSERT INTO department(name) VALUES ("Sales");

INSERT INTO role(title, salary, department_id) VALUES ("Manager", 100000, 1);
INSERT INTO role(title, salary, department_id) VALUES ("Sales Associate", 24000, 1);

INSERT INTO employee(first_name, last_name, role_id) VALUES ("Black", "Beard", 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Janet", "Tour", 2, 1);


