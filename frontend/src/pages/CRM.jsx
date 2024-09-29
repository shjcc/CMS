import React, { useState } from 'react';

// Customer data schema: { id, name, contact, orderHistory, preferences }
const CRM = () => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState({ name: '', contact: '', orderHistory: '', preferences: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Add or Update customer
  const handleSave = () => {
    if (isEditing) {
      const updatedCustomers = [...customers];
      updatedCustomers[editingIndex] = currentCustomer;
      setCustomers(updatedCustomers);
      setIsEditing(false);
    } else {
      setCustomers([...customers, { ...currentCustomer, id: Date.now() }]);
    }
    setCurrentCustomer({ name: '', contact: '', orderHistory: '', preferences: '' });
  };

  // Edit customer
  const handleEdit = (index) => {
    setCurrentCustomer(customers[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  // Delete customer
  const handleDelete = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
  };

  return (
    <div className="crm-container">
      <h2>Customer Management</h2>

      {/* Form for creating/updating customers */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={currentCustomer.name}
          onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Contact Details"
          value={currentCustomer.contact}
          onChange={(e) => setCurrentCustomer({ ...currentCustomer, contact: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Order History"
          value={currentCustomer.orderHistory}
          onChange={(e) => setCurrentCustomer({ ...currentCustomer, orderHistory: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dietary Restrictions/Preferences"
          value={currentCustomer.preferences}
          onChange={(e) => setCurrentCustomer({ ...currentCustomer, preferences: e.target.value })}
        />
        <button type="submit">{isEditing ? 'Update Customer' : 'Add Customer'}</button>
      </form>

      {/* List of customers */}
      <h3>Customer List</h3>
      <ul>
        {customers.map((customer, index) => (
          <li key={customer.id}>
            <strong>{customer.name}</strong> - {customer.contact}
            <br />
            Order History: {customer.orderHistory || 'None'}
            <br />
            Preferences: {customer.preferences || 'None'}
            <br />
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRM;


