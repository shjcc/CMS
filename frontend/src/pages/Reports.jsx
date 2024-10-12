import React, { useState } from 'react';
import reportData from '../components/ReportsData'; // Import your report data from ReportsData.jsx
import '../styles/Reports.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Label } from 'recharts'; // Import Recharts components

const Reports = () => {
    const [orderFilters, setOrderFilters] = useState({
        startDate: '',
        endDate: '',
        customerType: 'new',
        orderStatus: 'pending',
    });

    const [salesFilters, setSalesFilters] = useState({
        startDate: '',
        endDate: '',
        selectedMonth: '', // New state for month selection
        yearToDate: false, // New state for year-to-date selection
    });

    const [filteredReports, setFilteredReports] = useState([]);
    const [orderResults, setOrderResults] = useState([]); // New state for order results
    const [isGeneratingOrders, setIsGeneratingOrders] = useState(false); // Show loading state for orders
    const [isGeneratingSales, setIsGeneratingSales] = useState(false); // Show loading state for sales reports

    // Handle order filter changes
    const handleOrderFilterChange = (e) => {
        const { name, value } = e.target;
        setOrderFilters({ ...orderFilters, [name]: value });
    };

    // Handle sales filter changes
    const handleSalesFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSalesFilters({ ...salesFilters, [name]: type === 'checkbox' ? checked : value });
    };

    // Filter reports based on order filters
    const generateOrderReport = () => {
        setIsGeneratingOrders(true); // Show loading state
        const { startDate, endDate, customerType, orderStatus } = orderFilters;

        // Filter logic using the data in reportData
        const filtered = reportData.filter((report) => {
            const matchesDate = (!startDate || report.date >= startDate) && (!endDate || report.date <= endDate);
            const matchesCustomer = customerType ? report.customerType === customerType : true;
            const matchesStatus = orderStatus ? report.orderStatus === orderStatus : true;

            return matchesDate && matchesCustomer && matchesStatus;
        });

        setTimeout(() => {
            setOrderResults(filtered); // Set order results
            setFilteredReports([]); // Clear filtered reports for sales
            setIsGeneratingOrders(false); // Stop loading state
        }, 500); // Simulate delay for loading
    };

    // Generate sales report based on sales filters
    const generateSalesReport = () => {
        setIsGeneratingSales(true); // Show loading state
        const { startDate, endDate, selectedMonth, yearToDate } = salesFilters;

        let filteredSales = reportData;

        if (yearToDate) {
            const currentYear = new Date().getFullYear();
            filteredSales = reportData.filter((report) => {
                const reportDate = new Date(report.date);
                return reportDate.getFullYear() === currentYear; // Filter for year-to-date
            });
        } else if (selectedMonth) {
            const monthIndex = new Date(Date.parse(selectedMonth + " 1, 2021")).getMonth(); // Convert month name to index
            filteredSales = reportData.filter((report) => {
                const reportDate = new Date(report.date);
                return reportDate.getMonth() === monthIndex; // Filter by selected month
            });
        } else {
            // If no month or year-to-date is selected, filter by date range
            filteredSales = reportData.filter((report) => {
                return (!startDate || report.date >= startDate) && (!endDate || report.date <= endDate);
            });
        }

        setTimeout(() => {
            setFilteredReports(filteredSales); // Set filtered sales reports
            setOrderResults([]); // Clear order results
            setIsGeneratingSales(false); // Stop loading state
        }, 500); // Simulate delay for loading
    };

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        generateOrderReport();
    };

    const handleSalesSubmit = (e) => {
        e.preventDefault();
        generateSalesReport();
    };

    // Prepare data for sales chart
    const chartData = [];
    
    // Group by month and sum sales amounts
    filteredReports.forEach(report => {
        const reportDate = new Date(report.date);
        const month = reportDate.toLocaleString('default', { month: 'long' }); // Get month name
        const year = reportDate.getFullYear();

        const existingMonth = chartData.find(data => data.name === `${month} ${year}`);
        if (existingMonth) {
            existingMonth.sales += report.salesAmount; // Sum the sales
        } else {
            chartData.push({ name: `${month} ${year}`, sales: report.salesAmount }); // Create new entry
        }
    });

    // Calculate yearly total sales
    const yearlyTotal = filteredReports.reduce((total, report) => total + report.salesAmount, 0);

    // Check if the last action was generating a sales report
    const showSalesChart = !isGeneratingOrders && filteredReports.length > 0 && (salesFilters.startDate || salesFilters.selectedMonth || salesFilters.yearToDate);

    return (
        <div className="reports-container">
            {/* Flex container for search forms */}
            <div className="search-forms-container">
                {/* Order Filter Form */}
                <form onSubmit={handleOrderSubmit} className="form-container">
                    <h2>Search Orders</h2>
                    <div>
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={orderFilters.startDate}
                            onChange={handleOrderFilterChange}
                        />
                    </div>

                    <div>
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={orderFilters.endDate}
                            onChange={handleOrderFilterChange}
                        />
                    </div>

                    <div>
                        <label>Customer Type:</label>
                        <select
                            name="customerType"
                            value={orderFilters.customerType}
                            onChange={handleOrderFilterChange}
                        >
                            <option value="new">New</option>
                            <option value="returning">Returning</option>
                        </select>
                    </div>

                    <div>
                        <label>Order Status:</label>
                        <select
                            name="orderStatus"
                            value={orderFilters.orderStatus}
                            onChange={handleOrderFilterChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <button type="submit">Generate Order Report</button>
                </form>

                {/* Sales Filter Form */}
                <form onSubmit={handleSalesSubmit} className="form-container">
                    <h2>Generate Sales Report</h2>

                    {/* Month Selection */}
                    <div>
                        <label>Select Month:</label>
                        <select
                            name="selectedMonth"
                            value={salesFilters.selectedMonth}
                            onChange={handleSalesFilterChange}
                        >
                            <option value="">Select Month</option>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>

                    {/* Year-to-Date Checkbox */}
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="yearToDate"
                                checked={salesFilters.yearToDate}
                                onChange={handleSalesFilterChange}
                            />
                            Year to Date
                        </label>
                    </div>

                    <div className="separator">
                        <strong>OR</strong>
                    </div>

                    {/* Existing Date Range Filters */}
                    <div>
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={salesFilters.startDate}
                            onChange={handleSalesFilterChange}
                        />
                    </div>

                    <div>
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={salesFilters.endDate}
                            onChange={handleSalesFilterChange}
                        />
                    </div>

                    <button type="submit">Generate Sales Report</button>
                </form>
            </div>

            {/* Order Report Results */}
            <div className="report-results">
                {isGeneratingOrders && <p className="loading-message">Loading order reports...</p>}
                {!isGeneratingOrders && orderResults.length > 0 && (
                    <div>
                        <h2>Order Report Results</h2>
                        <ul>
                            {orderResults.map((report, index) => (
                                <li key={index}>
                                    <h3>Customer: {report.customerName}</h3>
                                    <p>Product: {report.productName}</p>
                                    <p>Sales: ${report.salesAmount}</p>
                                    <p>Status: {report.orderStatus}</p>
                                    <p>Date: {report.date}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Sales Report Results */}
            <div className="report-results">
                {isGeneratingSales && <p className="loading-message">Loading sales reports...</p>}
                {showSalesChart && (
                    <div>
                        <h2>Sales Report Results</h2>
                        <h3>Total Sales This Year: ${yearlyTotal}</h3> {/* Display total sales */}
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name">
                                    <Label value="Month" offset={0} position="bottom" />
                                </XAxis>
                                <YAxis>
                                    <Label value="Sales ($)" angle={-90} position="insideLeft" />
                                </YAxis>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
