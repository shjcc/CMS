import React, { useState, useEffect } from 'react';
import ReportsData from '../components/ReportsData.jsx'; // Import the report data

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [filters, setFilters] = useState({
        dateRange: '',
        customerType: '',
        orderStatus: '',
    });

    // Filter reports based on selected filters
    const filterReports = () => {
        const filteredReports = ReportsData.filter((report) => {
            return (
                (filters.dateRange === '' || report.dateRange === filters.dateRange) &&
                (filters.customerType === '' || report.customerType === filters.customerType) &&
                (filters.orderStatus === '' || report.orderStatus === filters.orderStatus)
            );
        });
        setReports(filteredReports);
    };

    // Handle filter change
    const handleFilterChange = (filterName, filterValue) => {
        setFilters({ ...filters, [filterName]: filterValue });
    };

    // Fetch reports when filters change
    useEffect(() => {
        filterReports();
    }, [filters]);

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

            {/* Display Reports */}
            <div>
                <h2>Report Results</h2>
                {reports.length > 0 ? (
                    <ul>
                        {reports.map((report) => (
                            <li key={report.id}>
                                <h3>{report.productName}</h3>
                                <p>Sales: ${report.salesAmount}</p>
                                <p>Customer: {report.customerName}</p>
                                <p>Status: {report.orderStatus}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reports found for the selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default Reports;
