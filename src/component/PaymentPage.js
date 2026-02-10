import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("CARD");

  const handleStripePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/flower/checkout",
        {
          name: "Rose Bouquet",
          currency: "usd",
          amount: 1000,
          quantity: 1,
        }
      );

      const sessionUrl = response.data.sessionUrl;

      if (!sessionUrl) {
        alert("Session URL missing");
        return;
      }

      // 🔴 Stripe will handle redirect
      window.location.assign(sessionUrl);
    } catch (error) {
      alert("Payment failed");
    }
  };

  const handleCOD = async () => {
    try {
      // (optional) save COD order in backend
      // await axios.post("http://localhost:8080/order/cod");

      // ✅ Use EXISTING ROUTE
      navigate("/success");
    } catch (error) {
      alert("COD failed");
    }
  };

  return (
    <div className="payment-container">
      <h2>Select a payment method</h2>

      {/* CARD / UPI */}
      <div className="payment-option">
        <label>
          <input
            type="radio"
            checked={paymentMethod === "CARD"}
            onChange={() => setPaymentMethod("CARD")}
          />
          Credit / Debit Card / UPI
        </label>

        {paymentMethod === "CARD" && (
          <button className="pay-now-btn" onClick={handleStripePayment}>
            Pay ₹1000
          </button>
        )}
      </div>

      {/* COD */}
      <div className="payment-option">
        <label>
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery
        </label>

        {paymentMethod === "COD" && (
          <button className="pay-now-btn cod-btn" onClick={handleCOD}>
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
