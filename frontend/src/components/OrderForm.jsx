import React, { useState } from 'react';
import dayjs from 'dayjs';


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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            />
            <select 
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                required
            >
                <option value="Pickup">Pickup</option>
                <option value="Delivery">Delivery</option>
            </select>
            <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
            />
            <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
            />
            <button type="submit">Add Order</button>
        </form>
    );
};

export default OrderForm;
