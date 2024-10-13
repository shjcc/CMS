const express = require('express');
const cors = require('cors');
const { getOrders, createOrder, updateOrder, deleteOrder } = require('./controllers/orderController');
const { getInventory, createInventoryItem, updateInventoryItem, deleteInventoryItem } = require('./controllers/inventoryController');
const { createPayment } = require('./squarePayment');

const app = express();
app.use(cors());
app.use(express.json());

// Add the Square payment route
app.post('/api/payment', createPayment);

const PORT = process.env.PORT || 5000;

// Order Routes
app.get('/api/orders', getOrders);
app.post('/api/orders', createOrder);
app.put('/api/orders/:id', updateOrder);
app.delete('/api/orders/:id', deleteOrder);

// Inventory Routes
app.get('/api/inventory', getInventory); // Fetch inventory
app.post('/api/inventory', createInventoryItem); // Create inventory item
app.put('/api/inventory/:id', updateInventoryItem); // Update inventory item
app.delete('/api/inventory/:id', deleteInventoryItem); // Delete inventory item

// CRM Routes
app.get('/api/customers', getCustomers); // Fetch all customers
app.post('/api/customers', createCustomer); // Create a new customer
app.put('/api/customers/:id', updateCustomer); // Update customer details
app.delete('/api/customers/:id', deleteCustomer); // Delete a customer

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
