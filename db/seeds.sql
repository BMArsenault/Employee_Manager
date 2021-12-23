USE employees;
INSERT INTO departments (dept_name)
VALUES
  ('Administration'),
  ('Finance'),
  ('Communications'),
  ('Warehouse');
INSERT INTO roles (title, salary, department_id)
VALUES
  ('Cashier', 24000, 1),
  ('Front Desk', 35000, 1),
  ('Design', 40000, 2),
  ('Sales', 56000, 3),
  ('Forklift Driver', 32000, 4),
  ('Shipping', 32000, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 3),
  ('Thomas', 'Fairchild', 3, 2),
  ('Kelly', 'Johnson', 4, 2),
  ('Joel', 'Martin', 2, 1),
  ('Jessica', 'Vart', 4, 2),
  ('Mercedes', 'Lewis', 6, 4),
  ('Aaron', 'Rodgers', 5, 4),
  ('Aaron', 'Donald', 6, 4);