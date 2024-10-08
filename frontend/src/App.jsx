import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'; 
import Dashboard from './pages/Dashboard';
import OrderManagement from './pages/OrderManagement';
import InventoryManagement from './pages/InventoryManagement';
import ProductionManagement from './pages/ProductionManagement';
import CRM from './pages/CRM';
import Reports from './pages/Reports';
import ForgotPassword from './pages/ForgotPassword';
import "./Login.css"; 
import "./App.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();  
        navigate('/'); 
    };

    return (
        <div className="title-container">
            {/* left side for logo and title */}
            <div className="title-content">
                <img
                    id="councilLogo"
                    className="image"
                    src="assets/council-logo.svg" 
                    alt="Image not found"
                />

                {/* title */}
                <h2>Catering Management System</h2>

                <div className="login-container">
                    <div className="login-box">
                        {/* form for login */}
                        <form onSubmit={handleSubmit} className="login-form">
                            <input
                                type="email"
                                id="user-email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="login-input"
                            />
                            <input
                                type="password"
                                id="user-password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input"
                                required
                            />

                            {/* log in button */}
                            <button type="submit" className="login-button">
                                Sign In
                            </button>
                        </form>

                        {/* forgot password link */}
                        <Link to="/forgot-password" className="forgot-password-link">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>

            {/* right side background image */}
            <div className="background-image"></div>
        </div>
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            {!isLoggedIn ? (
                // if the user is not logged in, show the login screen
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            ) : (
                <>
                    {/* navigation links for authenticated users */}
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
                </>
            )}
        </Router>
    );
}

export default App;
