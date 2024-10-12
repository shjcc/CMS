CREATE DATABASE catering_system;
USE catering_system;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerName VARCHAR(100),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  quantity INT,
  expiry DATE
);

CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  total_quantity INT
);

CREATE TABLE recipe_ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  ingredient_id INT,
  quantity_required INT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

CREATE TABLE workflows (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  step_number INT,
  instruction TEXT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE wasted_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ingredient_id INT,
  quantity_wasted INT,
  reason TEXT,
  wasted_on DATE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);