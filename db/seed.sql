INSERT INTO department (name)
VALUES ("Finance"), ("Accounting"), ("Tech"), ("Sales"), ("Management");

INSERT INTO role (title, salary, department_id)
VALUE ("Financial Analyst", 75000.00, 2), ("Accountant", 90000.00, 3), ("Developer", 100000.00, 4), ("Sales Rep", 120000.00, 1), ("Senior Manager", 250000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jim", "Perez", 1, 3), ("Jeff", "Zuck", 1, 1), ("Tom", "Chevy", 3, 2), ("Becky", "Crain", 5, 2), ("Jordan", "Beck", 5, 2);