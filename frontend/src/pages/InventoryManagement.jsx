import React, { useState, useEffect } from 'react';
import '../styles/Inventory.css'; // Make sure to include the CSS styles

const InventoryManagement = () => {
  const [ingredients, setIngredients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [expiredItems, setExpiredItems] = useState([]);

  // Sample data for demonstration
  const sampleData = [
    { name: 'Milk', quantity: 6, expiry: '2024-05-10' },
    { name: 'Cheese', quantity: 4, expiry: '2024-09-30' }, // This will be expired
    { name: 'Yogurt', quantity: 10, expiry: '2024-10-05' },
    { name: 'Butter', quantity: 3, expiry: '2024-10-01' }, // This will be expired
  ];

  // Fetch ingredients from API using fetch
  useEffect(() => {
    // Instead of fetching from an API, we'll use sample data for now
    setIngredients(sampleData);
  }, []);

  // Check for ingredients with short shelf life and expired items
  useEffect(() => {
    const today = new Date();
    const upcomingAlerts = [];
    const expired = [];

    ingredients.forEach(item => {
      const expiryDate = new Date(item.expiry);
      const timeDiff = expiryDate - today;
      const daysLeft = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

      if (daysLeft < 0) {
        expired.push(item); // Item is expired
      } else if (daysLeft <= 3) {
        upcomingAlerts.push(item); // Item is expiring soon
      }
    });

    setAlerts(upcomingAlerts);
    setExpiredItems(expired);
  }, [ingredients]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="inventory-management">
      <h1>Inventory Management</h1>

      {expiredItems.length > 0 && (
        <div className="alert-box expired-alerts">
          <h2>Alert: Expired Items</h2>
          <ul>
            {expiredItems.map((expiredItem, index) => (
              <li key={index} className="alert-item expired-item">
                {expiredItem.name} has expired! (Expiry: {formatDate(expiredItem.expiry)})
              </li>
            ))}
          </ul>
        </div>
      )}

      {alerts.length > 0 && (
        <div className="alert-box">
          <h2>Alert: Items Close to Expiry</h2>
          <ul>
            {alerts.map((alertItem, index) => (
              <li key={index} className="alert-item">
                {alertItem.name} is expiring soon! (Expiry: {formatDate(alertItem.expiry)})
              </li>
            ))}
          </ul>
        </div>
      )}

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item, index) => (
            <tr 
              key={index} 
              className={new Date(item.expiry) - new Date() <= 3 * 24 * 3600 * 1000 ? 'expiring-soon' : ''}
            >
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{formatDate(item.expiry)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;
