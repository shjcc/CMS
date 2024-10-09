const { db } = require('../config');

// Get all inventory items
const getInventory = (req, res) => {
  const query = 'SELECT * FROM ingredients'; 
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Create new inventory item
const createInventoryItem = (req, res) => {
  const { name, quantity, expiry } = req.body;
  const query = 'INSERT INTO ingredients (name, quantity, expiry) VALUES (?, ?, ?)';
  db.query(query, [name, quantity, expiry], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Inventory item added', id: result.insertId });
  });
};

const updateInventoryItem = (req, res) => {
  const { id } = req.params;
  const { name, quantity, expiry } = req.body;
  
  const query = 'UPDATE ingredients SET name = ?, quantity = ?, expiry = ? WHERE id = ?';
  db.query(query, [name, quantity, expiry, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Inventory item updated successfully' });
  });
};

// Delete inventory item
const deleteInventoryItem = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM ingredients WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Inventory item deleted' });
  });
};

module.exports = {
  getInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
};
