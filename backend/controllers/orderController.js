const { db } = require('../config'); 

// Get all orders
const getOrders = (req, res) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        console.log(results); // Log to see if scheduled fields are included
        res.json(results);
    });
};

// Create a new order
const createOrder = (req, res) => {
    const { customerName, status, orderType, scheduledDate, scheduledTime } = req.body;
    const query = 'INSERT INTO orders (customerName, status, orderType, scheduledDate, scheduledTime) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [customerName, status, orderType, scheduledDate, scheduledTime], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Order added successfully', orderId: result.insertId });
    });
};

// Update an existing order
const updateOrder = (req, res) => {
    const { id } = req.params;
    const { customerName, status, orderType, scheduledDate, scheduledTime } = req.body;
    const query = 'UPDATE orders SET customerName = ?, status = ?, orderType = ?, scheduledDate = ?, scheduledTime = ? WHERE id = ?';
    
    db.query(query, [customerName, status, orderType, scheduledDate, scheduledTime, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Order updated successfully' });
    });
};

// Delete an order
const deleteOrder = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM orders WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Order deleted successfully' });
    });
};

module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
};
