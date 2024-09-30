import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const upcomingOrders = [
        { id: 1, name: 'John Doe', date: '2024-09-30', time: '12:00 PM' },
        { id: 2, name: 'Jane Smith', date: '2024-10-01', time: '2:30 PM' },
    ];

    const inventoryAlerts = [
        { id: 1, item: 'Flour', status: 'Low Stock' },
        { id: 2, item: 'Ham', status: 'Out of Stock' },
    ];

    const productionSchedule = [
        { id: 1, item: 'Cake', quantity: 10, time: '2024-09-30 10:00 AM' },
        { id: 2, item: 'Sandwich', quantity: 20, time: '2024-09-30 11:00 AM' },
    ];

    const totalOrders = 125; // Sample total orders count

    return (
        <div className="dashboard-container">
            <div className="alert-box">
                <h3>Upcoming Orders</h3>
                <ul>
                    {upcomingOrders.map(order => (
                        <li key={order.id}>
                            {order.name} - {order.date} at {order.time}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="alert-box">
                <h3>Inventory Alerts</h3>
                <ul>
                    {inventoryAlerts.map(alert => (
                        <li key={alert.id}>
                            {alert.item} - {alert.status}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="alert-box">
                <h3>Production Schedule</h3>
                <ul>
                    {productionSchedule.map(schedule => (
                        <li key={schedule.id}>
                            {schedule.item}: {schedule.quantity} units at {schedule.time}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="summary-box">
                <h3>Total Orders</h3>
                <p>{totalOrders}</p>
            </div>
        </div>
    );
};

export default Dashboard;
