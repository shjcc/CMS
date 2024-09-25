-- CREATE DATABASE catering_system;

USE catering_system;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerName VARCHAR(100),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO orders (customerName, status) VALUES ('Alice', 'Pending');
INSERT INTO orders (customerName, status) VALUES ('Bob', 'Completed');
