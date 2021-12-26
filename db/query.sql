-- add salary total in roles --
SELECT SUM(salary) FROM roles;
-- search for salary in a specific department --
SELECT departments.dept_name AS 'Department', SUM(roles.salary) AS 'Budget Per Dept'
FROM employees
LEFT JOIN roles on employees.role_id = roles.id
LEFT JOIN departments on roles.department_id = departments.id
GROUP BY departments.dept_name;