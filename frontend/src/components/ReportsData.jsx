const ReportsData = [
    {
        id: 1,
        productName: 'Product A',
        salesAmount: 1500,
        customerName: 'John Doe',
        customerType: 'new', // Make sure this matches the filter value
        orderStatus: 'pending', // Make sure this matches the filter value
        dateRange: 'daily', // Make sure this matches the filter value
    },
    {
        id: 2,
        productName: 'Product B',
        salesAmount: 2000,
        customerName: 'Jane Smith',
        customerType: 'returning', // Ensure consistency
        orderStatus: 'completed',
        dateRange: 'weekly',
    },
    {
        id: 3,
        productName: 'Product C',
        salesAmount: 1000,
        customerName: 'Alice Johnson',
        customerType: 'new',
        orderStatus: 'completed',
        dateRange: 'monthly',
    }
];

export default ReportsData;
