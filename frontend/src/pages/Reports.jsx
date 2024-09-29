import React, { useState } from 'react';
import reportData from './ReportsData'; // Import your report data from ReportsData.jsx

const Reports = () => {
    const [filters, setFilters] = useState({
        dateRange: 'daily',
        customerType: 'new',
        orderStatus: 'pending',
    });

    const [filteredReports, setFilteredReports] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false); // Show loading state

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // Filter reports based on selected filters
    const generateReport = () => {
        setIsGenerating(true); // Show loading state
        const { dateRange, customerType, orderStatus } = filters;

        // Filter logic using the data in reportData
        const filtered = reportData.filter((report) => {
            const matchesDate = dateRange ? report.dateRange === dateRange : true;
            const matchesCustomer = customerType ? report.customerType === customerType : true;
            const matchesStatus = orderStatus ? report.status === orderStatus : true;

            return matchesDate && matchesCustomer && matchesStatus;
        });

        setTimeout(() => {
            setFilteredReports(filtered);
            setIsGenerating(false); // Stop loading state
        }, 500); // Simulate delay for loading
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        generateReport();
    };

    return (
        <div>
            <h1>Sales Reports</h1>

            {/* Filter Form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date Range:</label>
                    <select
                        name="dateRange"
                        value={filters.dateRange}
                        onChange={handleFilterChange}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                <div>
                    <label>Customer Type:</label>
                    <select
                        name="customerType"
                        value={filters.customerType}
                        onChange={handleFilterChange}
                    >
                        <option value="new">New</option>
                        <option value="returning">Returning</option>
                    </select>
                </div>

                <div>
                    <label>Order Status:</label>
                    <select
                        name="orderStatus"
                        value={filters.orderStatus}
                        onChange={handleFilterChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type="submit">Generate Report</button>
            </form>

            {/* Loading state */}
            {isGenerating && <p>Loading reports...</p>}

            {/* Display filtered reports */}
            {filteredReports.length > 0 && !isGenerating && (
                <div>
                    <h2>Report Results</h2>
                    <ul>
                        {filteredReports.map((report, index) => (
                            <li key={index}>
                                <h3>{report.productName}</h3>
                                <p>Sales: ${report.salesAmount}</p>
                                <p>Customer: {report.customerName}</p>
                                <p>Status: {report.status}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!isGenerating && filteredReports.length === 0 && <p>No reports found for the selected filters.</p>}
        </div>
    );
};

export default Reports;
