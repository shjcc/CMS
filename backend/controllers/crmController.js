const { db } = require('../config');

// Get all customers
const getCustomers = (req, res) => {
  const query = 'SELECT * FROM customers'; // Ensure the 'customers' table exists in your database
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Create a new customer
const createCustomer = (req, res) => {
    const { name, contact, orderHistory, preferences } = req.body;
    const query = 'INSERT INTO customers (name, contact, orderHistory, preferences) VALUES (?, ?, ?, ?)';
    db.query(query, [name, contact, orderHistory, preferences], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Customer added', id: result.insertId });
    });
  };

// Update an existing customer
const updateCustomer = (req, res) => {
    const { id } = req.params;
    const { name, contact, orderHistory, preferences } = req.body;
  
    const query = 'UPDATE customers SET name = ?, contact = ?, orderHistory = ?, preferences = ? WHERE id = ?';
    db.query(query, [name, contact, orderHistory, preferences, id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Customer updated successfully' });
    });
  };

// Delete a customer
const deleteCustomer = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM customers WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Customer deleted' });
  });
};

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
