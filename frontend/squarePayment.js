// import React, { useState, useEffect } from 'react';
// import { Square } from 'square';

// const SquarePayment = () => {
//     const [amount, setAmount] = useState('');
//     const [client, setClient] = useState(null);
//     const [nonce, setNonce] = useState('');

//     useEffect(() => {
//         // Initialize Square client
//         const initSquareClient = async () => {
//             const squareClient = new Square({
//                 accessToken: 'EAAAl9FmrlJ5J4vILUWfhnA0lY_H8-1QHgbOdv3Oi09WZLJRMm878mVFtwHoGClw', // Replace with your actual sandbox access token
//                 environment: 'sandbox', // Use 'production' for live mode
//             });
//             setClient(squareClient);
//         };

//         initSquareClient();
//     }, []);

//     const handlePayment = async () => {
//         if (!client) {
//             console.error('Square client not initialized');
//             return;
//         }

//         try {
//             // Generate a nonce using the Square Payment Form
//             // Need to replace 'nonce' with the actual nonce you obtain from the Square Payment Form
//             const response = await fetch('/api/payments', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ amount: Number(amount), nonce }), // Include the amount and nonce
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             // Handle successful payment
//             console.log('Payment successful:', data);
//             alert('Payment successful!');
//         } catch (error) {
//             console.error('Payment error:', error);
//             alert('Payment failed. Please try again.');
//         }
//     };

//     const handleNonceChange = (e) => {
//         setNonce(e.target.value); // Update nonce when user enters it (replace with actual nonce handling)
//     };

//     return (
//         <div>
//             <h2>Make a Payment</h2>
//             <input
//                 type="number"
//                 placeholder="Enter amount in cents"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Enter nonce from Square"
//                 value={nonce}
//                 onChange={handleNonceChange}
//             />
//             <button onClick={handlePayment}>Pay</button>
//         </div>
//     );
// };

// export default SquarePayment;
