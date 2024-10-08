CREATE DATABASE catering_system;

USE catering_system;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerName VARCHAR(100),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO orders (customerName, status) VALUES ('Alice', 'Pending');
INSERT INTO orders (customerName, status) VALUES ('Bob', 'Completed');

CREATE TABLE ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  quantity INT,
  expiry DATE
);

INSERT INTO ingredients (name, quantity, expiry) 
VALUES 
  ('Milk', 6, '2024-05-10'),
  ('Cheese', 4, '2024-09-30'),
  ('Yogurt', 10, '2024-10-05'),
  ('Butter', 3, '2024-10-01');