USE employees;
INSERT INTO departments (dept_name)
VALUES
  ('Administration'),
  ('Finance'),
  ('Communications'),
  ('Management'),
  ('Warehouse');
INSERT INTO roles (title, salary, department_id)
VALUES
  ('Cashier', 24000, 1),
  ('Front Desk', 35000, 1),
  ('Design', 40000, 3),
  ('District Manager', 80000, 4),
  ('Sales', 56000, 3),
  ('Accounting', 60000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 4, NULL),
  ('Thomas', 'Fairchild', 3, 2),
  ('Kelly', 'Johnson', 4, NULL),
  ('Joel', 'Martin', 2, 1),
  ('Jessica', 'Vart', 4, NULL),
  ('Mercedes', 'Lewis', 6, 2),
  ('Aaron', 'Rodgers', 1, 4),
  ('Eric', 'Smith', 2, 1),
  ('Jordan', 'Burns', 4, NULL),
  ('Tammy', 'Peterson', 5, 1),
  ('Aaron', 'Donald', 6, 3);