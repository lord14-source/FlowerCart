import React, { useState } from 'react';
import './PaymentPage.css';

const PaymentPage = () => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [total, setTotal] = useState(450); // Example total amount

  // Razorpay Payment Integration
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address.');
      return;
    }
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay API key
      amount: total * 100, // Convert to paise (e.g., ₹450 -> 45000 paise)
      currency: 'INR',
      name: 'FlowerCart',
      description: 'Order Payment',
      image: 'https://example.com/your-logo.png', // Replace with your logo URL
      handler: (response) => {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        console.log(response); // Log response for further actions
        // Add API call to store payment details in the backend here
      },
      prefill: {
        name: 'Your Name', // Replace with user's name
        email: 'your.email@example.com', // Replace with user's email
        contact: '1234567890', // Replace with user's phone number
      },
      notes: {
        address: selectedAddress,
      },
      theme: {
        color: '#F37254', // Razorpay theme color
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="payment-page" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2>Payment Page</h2>

      {/* Cart Summary */}
      <section style={{ marginBottom: '20px' }}>
        <h3>Order Summary</h3>
        <ul>
          <li>Roses Bouquet - ₹200</li>
          <li>Tulip Basket - ₹150</li>
          <li>Delivery Charges - ₹50</li>
        </ul>
        <h4>Total: ₹{total}</h4>
      </section>

      {/* Delivery Address */}
      <section style={{ marginBottom: '20px' }}>
        <h3>Delivery Address</h3>
        <select
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
          style={{ padding: '5px', width: '100%' }}
        >
          <option value="">Select Address</option>
          <option value="Home">Home - 123 Flower Street, Springfield</option>
          <option value="Office">Office - 456 Blossom Road, Metropolis</option>
        </select>
      </section>

      {/* Payment Methods */}
      <section style={{ marginBottom: '20px' }}>
        <h3>Payment Method</h3>
        <label>
          <input
            type="radio"
            name="payment"
            value="Card"
            checked={paymentMethod === 'Card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Credit/Debit Card
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={paymentMethod === 'UPI'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="payment"
            value="NetBanking"
            checked={paymentMethod === 'NetBanking'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Net Banking
        </label>
      </section>

      {/* Promo Code */}
      <section style={{ marginBottom: '20px' }}>
        <h3>Apply Promo Code</h3>
        <input
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          style={{ padding: '5px', width: '100%' }}
        />
        <button
          onClick={() => {
            if (promoCode === 'FLOWER10') {
              setTotal((prevTotal) => prevTotal - 10);
              alert('Promo code applied! ₹10 off.');
            } else {
              alert('Invalid promo code.');
            }
          }}
          style={{ marginTop: '10px', padding: '5px 10px' }}
        >
          Apply
        </button>
      </section>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        style={{
          backgroundColor: '#FFA500',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Pay ₹{total}
      </button>
    </div>
  );
};

export default PaymentPage;
