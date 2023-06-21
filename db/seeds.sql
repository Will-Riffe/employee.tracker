use employee_tracker;

INSERT INTO department
    (name)
VALUES
    ('Operation'),
    ('Finance'),
    ('Lapidary'),
    ('Ground Crew');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Owner', 900000, 1),
    ('Accountant', 50000, 2),
    ('Site Manager', 60000, 2),
    ('Sales Member', 35000, 2),
    ('Lapidary Supervisor', 50000, 3),
    ('Geologist', 35000, 3),
    ('Lapidary Artist', 35000, 3),
    ('Labor', 30000, 4),
    ('Labor Lead', 35000, 4),
    ('Sluiceway Attendant', 30000, 4),
    ('Tour Leader', 40000, 4);


INSERT INTO employee
    (forename, surname, role_id, manager_id)
VALUES
    ('Jeff', 'Johansen', 'Owner', NULL),
    ('Samantha', 'Accosta', 'Accountant', 2),
    ('Michael', 'Thompson', 'Site Manager', NULL),
    ('Jessica', 'Davis', 'Sales Member', 2),
    ('Daniel', 'Ramirez', 'Lapidary Supervisor', NULL),
    ('Carlos', 'Rodriguez', 'Geologist', 3),
    ('Maria', 'Hernandez', 'Lapidary Artist', 3),
    ('Juan', 'Ortiz', 'Labor', 4),
    ('Alejandro', 'Rojas', 'Labor', 4),
    ('Joe', 'Dirt', 'Labor', 4),
    ('Mateo', 'Silva', 'Labor Lead', NULL),
    ('Emilio', 'Galan', 'Sluiceway Attendant', 4),
    ('Jonathan', 'Menk', 'Sluiceway Attendant', 4),
    ('Maxamillion', 'Peguses', 'Tour Leader', NULL);