import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';


const EditOrderForm = ({ order, onUpdateOrder, onCancel }) => {
    const [customerName, setCustomerName] = useState('');
    const [status, setStatus] = useState('');
    const [orderType, setOrderType] = useState('Pickup');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');

    useEffect(() => {
        if (order) {
            setCustomerName(order.customerName);
            setStatus(order.status);
            setOrderType(order.orderType);
            const formattedDate = dayjs(order.scheduledDate).format('DD/MM/YYYY');
            setScheduledDate(order.scheduledDate); 
            setScheduledTime(order.scheduledTime); 
        }
    }, [order]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = dayjs(scheduledDate, 'DD/MM/YYYY').format('YYYY-MM-DD');


        const updatedOrder = { customerName, status, orderType, scheduledDate: formattedDate, scheduledTime };
        await onUpdateOrder(order.id, updatedOrder);
        onCancel();
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
            <button type="submit">Update Order</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditOrderForm;