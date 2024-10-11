const express = require('express');
const cors = require('cors');
const { getOrders, createOrder, updateOrder, deleteOrder } = require('./controllers/orderController');
const { getInventory, createInventoryItem, updateInventoryItem, deleteInventoryItem } = require('./controllers/inventoryController');

const { Client } = require('square');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Initialise Square client
const squareClient = new Client({
  accessToken: 'EAAAl9FmrlJ5J4vILUWfhnA0lY_H8-1QHgbOdv3Oi09WZLJRMm878mVFtwHoGClw',
  environment: 'sandbox',
});

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

// Square Invoice Route
app.post('/create-invoice', async (req, res) => {
  const { customerId, amount, dueDate } = req.body;

  try {
    const { result } = await squareClient.invoicesApi.createInvoice({
      invoice: {
        locationId: 'LA3R7WWJEP17G',
        primaryRecipient: {
          customerId: customerId,
        },
        paymentRequests: [
          {
            requestType: 'BALANCE',
            dueDate: dueDate, 
            fixedAmountRequestedMoney: {
              amount: amount,  // Amount in cents (e.g., 1000 = $10.00)
              currency: 'AUD',
            },
          },
        ],
      },
    });

    const invoiceId = result.invoice.id;
    // Publish (send) the invoice
    await squareClient.invoicesApi.publishInvoice(invoiceId);
    res.status(200).json({ success: true, invoiceId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
