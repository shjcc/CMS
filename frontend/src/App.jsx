import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import OrderManagement from './pages/OrderManagement';
import InventoryManagement from './pages/InventoryManagement';
import ProductionManagement from './pages/ProductionManagement';
import CRM from './pages/CRM';
import Reports from './pages/Reports';

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/orders">Order Management</Link></li>
                    <li><Link to="/inventory">Inventory Management</Link></li>
                    <li><Link to="/production">Production Management</Link></li>
                    <li><Link to="/crm">CRM</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<OrderManagement />} />
                <Route path="/inventory" element={<InventoryManagement />} />
                <Route path="/production" element={<ProductionManagement />} />
                <Route path="/crm" element={<CRM />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </Router>
    );
};

export default App;
