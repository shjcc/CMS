import React, { useState } from 'react';
import ReportsData from '../components/ReportsData'; // Importing data

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        dateRange: '',
        customerType: '',
        orderStatus: '',
    });

    // Filter reports based on filters
    const fetchReports = () => {
        setLoading(true);
        
        // Simulate a network request with a timeout to mimic async behavior
        setTimeout(() => {
            const filteredReports = ReportsData.filter((report) => {
                const dateMatch = filters.dateRange === '' || report.dateRange === filters.dateRange;
                const customerTypeMatch = filters.customerType === '' || report.customerType === filters.customerType;
                const orderStatusMatch = filters.orderStatus === '' || report.orderStatus === filters.orderStatus;

                return dateMatch && customerTypeMatch && orderStatusMatch;
            });

            setReports(filteredReports);
            setLoading(false); // Set loading to false when done
        }, 1000); // Simulate a 1-second delay
    };

    // Handle filter change
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

                {/* Generate Report Button */}
                <button type="button" onClick={fetchReports}>
                    Generate Report
                </button>
            </form>

            {/* Display Reports */}
            <div>
                <h2>Report Results</h2>
                {loading ? (
                    <p>Loading reports...</p>
                ) : reports.length > 0 ? (
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
