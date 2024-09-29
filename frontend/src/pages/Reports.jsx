import React, { useState } from 'react';
import ReportsData from '../components/ReportsData.jsx'; // Import local reports data

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false); // Track loading state
    const [filters, setFilters] = useState({
        dateRange: '',
        customerType: '',
        orderStatus: '',
    });

    // Function to filter reports based on selected filters
    const filterReports = () => {
        console.log("Applying filters:", filters); // Debug: log filters

        setLoading(true); // Start loading
        setTimeout(() => {
            // Apply filters from ReportsData.jsx
            const filteredReports = ReportsData.filter((report) => {
                const dateMatch = filters.dateRange === '' || report.dateRange === filters.dateRange;
                const customerMatch = filters.customerType === '' || report.customerType === filters.customerType;
                const statusMatch = filters.orderStatus === '' || report.orderStatus === filters.orderStatus;

                return dateMatch && customerMatch && statusMatch;
            });

            console.log("Filtered reports:", filteredReports); // Debug: log filtered reports
            setReports(filteredReports); // Set the filtered reports
            setLoading(false); // Stop loading
        }, 500); // Simulate loading delay
    };

    // Handle changes to filters
    const handleFilterChange = (filterName, filterValue) => {
        setFilters({ ...filters, [filterName]: filterValue });
    };

    return (
        <div>
            <h1>Sales Reports</h1>

            {/* Filter Form */}
            <form>
                <div>
                    <label>Date Range:</label>
                    <select
                        value={filters.dateRange}
                        onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    >
                        <option value="">Select Range</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                <div>
                    <label>Customer Type:</label>
                    <select
                        value={filters.customerType}
                        onChange={(e) => handleFilterChange('customerType', e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="new">New</option>
                        <option value="returning">Returning</option>
                    </select>
                </div>

                <div>
                    <label>Order Status:</label>
                    <select
                        value={filters.orderStatus}
                        onChange={(e) => handleFilterChange('orderStatus', e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </form>

            {/* Generate Report Button */}
            <button onClick={filterReports}>Generate Report</button>

            {/* Display Loading State */}
            {loading && <p>Loading reports...</p>}

            {/* Display Filtered Reports */}
            {!loading && reports.length > 0 ? (
                <div>
                    <h2>Report Results</h2>
                    <ul>
                        {reports.map((report) => (
                            <li key={report.id}>
                                <h3>{report.productName}</h3>
                                <p>Sales: ${report.salesAmount}</p>
                                <p>Customer: {report.customerName} ({report.customerType})</p>
                                <p>Status: {report.orderStatus}</p>
                                <p>Date Range: {report.dateRange}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : !loading && (
                <p>No reports found for the selected filters.</p>
            )}
        </div>
    );
};

export default Reports;
