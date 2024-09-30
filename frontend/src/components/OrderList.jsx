import React from 'react';
import dayjs from 'dayjs'; 
import "../styles/order.css"; 

const OrderList = ({ orders, onDeleteOrder, onEditOrder }) => {
    return (
        <ul className="order-list">
            {orders.map((order) => (
                <li key={order.id} className="order-item">
                    <span className="order-details">
                        {order.customerName} - {order.status} - {order.orderType} - 
                        Scheduled for: {dayjs(order.scheduledDate).format('YYYY-MM-DD')} {order.scheduledTime}
                    </span>
                    <div className="order-actions">
                        <button className="edit-button" onClick={() => onEditOrder(order)}>Edit</button>
                        <button className="delete-button" onClick={() => onDeleteOrder(order.id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default OrderList;
