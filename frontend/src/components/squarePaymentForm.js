import { useEffect, useState } from 'react';
import axios from 'axios';

function SquarePaymentForm() {
  const [payments, setPayments] = useState(null);
  const [card, setCard] = useState(null);

  useEffect(() => {
    const initializeSquare = async () => {
      const paymentsInstance = await window.Square.payments(process.env.REACT_APP_SQUARE_APP_ID, process.env.REACT_APP_SQUARE_LOCATION_ID);
      const cardInstance = await paymentsInstance.card();
      await cardInstance.attach('#card-container');
      setPayments(paymentsInstance);
      setCard(cardInstance);
    };

    initializeSquare();
  }, []);

  const handlePayment = async () => {
    try {
      const tokenResult = await card.tokenize();
      if (tokenResult.status === 'OK') {
        const response = await axios.post('/api/payment', {
          sourceId: tokenResult.token,
          amount: 1000, // Specify the amount in cents ($10 = 1000 cents)
        });
        console.log('Payment successful', response.data);
      } else {
        console.error('Tokenization failed:', tokenResult.errors);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div>
      <form id="payment-form">
        <div id="card-container"></div>
        <button type="button" onClick={handlePayment}>Pay $10</button>
      </form>
    </div>
  );
}

export default SquarePaymentForm;
