-- Only create the database if it does not exist
CREATE DATABASE IF NOT EXISTS catering_system;
USE catering_system;

-- Create the orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerName VARCHAR(100),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the ingredients table
CREATE TABLE IF NOT EXISTS ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  quantity INT,
  expiry DATE
);

-- Create the recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  total_quantity INT
);

-- Create the recipe_ingredients table with foreign keys
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  ingredient_id INT,
  quantity_required INT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- Create the workflows table with foreign key
CREATE TABLE IF NOT EXISTS workflows (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  step_number INT,
  instruction TEXT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

-- Create the wasted_items table with foreign key
CREATE TABLE IF NOT EXISTS wasted_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ingredient_id INT,
  quantity_wasted INT,
  reason TEXT,
  wasted_on DATE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  contact VARCHAR(100),
  orderHistory TEXT,
  preferences VARCHAR(255) 
);