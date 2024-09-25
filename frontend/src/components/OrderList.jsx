import React from 'react';

const OrderList = ({ orders, onDeleteOrder, onEditOrder }) => {
    return (
        <ul>
            {orders.map((order) => (
                <li key={order.id}>
                    {order.customerName} - {order.status} - {order.orderType} - 
                    Scheduled for: {order.scheduledDate} {order.scheduledTime}
                    <button onClick={() => onEditOrder(order)}>Edit</button>
                    <button onClick={() => onDeleteOrder(order.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default OrderList;
