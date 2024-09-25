const express = require('express');
const cors = require('cors');
const { getOrders, createOrder, updateOrder, deleteOrder } = require('./controllers/orderController');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.get('/api/orders', getOrders); // fetch order function
app.post('/api/orders', createOrder); // create order function
app.put('/api/orders/:id', updateOrder); // update order function
app.delete('/api/orders/:id', deleteOrder); // delete order function

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
