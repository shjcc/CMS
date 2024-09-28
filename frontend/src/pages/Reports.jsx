import React, { useState, useEffect } from 'react';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [filters, setFilters] = useState({
        dateRange: '',
        customerType: '',
        orderStatus: '',
    });

    // Demo data for reports
    const demoReports = [
        {
            id: 1,
            productName: 'Product A',
            salesAmount: 1500,
            customerName: 'John Doe',
            status: 'completed',
        },
        {
            id: 2,
            productName: 'Product B',
            salesAmount: 2000,
            customerName: 'Jane Smith',
            status: 'pending',
        },
        {
            id: 3,
            productName: 'Product C',
            salesAmount: 1000,
            customerName: 'Alice Johnson',
            status: 'completed',
        },
    ];

    // Fetch reports based on filters
    const fetchReports = async () => {
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:5000/api/reports?${query}`);
        const data = await response.json();
        setReports(data.length > 0 ? data : demoReports); // Use demo data if no data from API
    };

    // Handle filter change
    const handleFilterChange = (filterName, filterValue) => {
        setFilters({ ...filters, [filterName]: filterValue });
    };

    // Fetch reports when filters change
    useEffect(() => {
        fetchReports();
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
                                <p>Status: {report.status}</p>
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
