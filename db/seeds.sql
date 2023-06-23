USE employee_tracker;

INSERT INTO department (name)
VALUES 
('Operation'), 
('Finance'), 
('Lapidary'), 
('Ground Crew');

INSERT INTO role (title, salary, department_id)
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

INSERT INTO employee (forename, surname, role_id, manager_id)
VALUES 
    ('Jeff', 'Johansen', 1, NULL),
    ('Samantha', 'Accosta', 2, 2),
    ('Michael', 'Thompson', 3, NULL), 
    ('Jessica', 'Davis', 4, 2),
    ('Daniel', 'Ramirez', 5, NULL), 
    ('Carlos', 'Rodriguez', 6, 3),
    ('Maria', 'Hernandez', 7, 3), 
    ('Mateo', 'Silva', 8, NULL), 
    ('Joe', 'Dirt', 9, 4),
    ('Emilio', 'Galan', 10, 4),
    ('Jonathan', 'Menk', 10, 4), 
    ('Maxamillion', 'Peguses', 11, NULL);
