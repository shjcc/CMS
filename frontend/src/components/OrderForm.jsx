import React, { useState } from 'react';
import dayjs from 'dayjs';
import "../styles/order.css"; 

const OrderForm = ({ onAddOrder }) => {
    const [customerName, setCustomerName] = useState('');
    const [status, setStatus] = useState('');
    const [orderType, setOrderType] = useState('Pickup');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDate = dayjs(scheduledDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

        const newOrder = { customerName, status, orderType, scheduledDate: formattedDate, scheduledTime };

        await onAddOrder(newOrder);

        setCustomerName('');
        setStatus('');
        setOrderType('Pickup');
        setScheduledDate('');
        setScheduledTime('');
    };

    return (
        <form onSubmit={handleSubmit} className="order-form">
            <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="order-input"
            />
            <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="order-select"
            >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
            <select 
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                required
                className="order-select"
            >
                <option value="Pickup">Pickup</option>
                <option value="Delivery">Delivery</option>
            </select>
            <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
                className="order-date"
            />
            <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
                className="order-time"
            />
            <button type="submit" className="order-button">Add Order</button>
        </form>
    );
};

export default OrderForm;
