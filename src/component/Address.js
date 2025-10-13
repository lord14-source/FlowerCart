import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Address.css';

function Address() {
  const [address, setAddress] = useState({
    cstr_name: "", // Backend field for "Full Name"
    strt_address: "", // Backend field for "Street Address"
    city: "",
    state: "",
    zip_code: "", // Backend field for "Zip Code"
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8082/Food/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Address submitted successfully!");
        console.log("Response:", data);

        // Redirect to the payment page
        navigate("/payment");
      } else {
        alert("Failed to submit the address. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting address:", error);
      alert("An error occurred while submitting the address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="address-container">
      <h2 className="address-header">Enter Shipping Address</h2>
      <form onSubmit={handleSubmit} className="address-form">
        <div className="form-group">
          <label htmlFor="cstr_name">Full Name</label>
          <input
            type="text"
            id="cstr_name"
            name="cstr_name"
            value={address.cstr_name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="strt_address">Street Address</label>
          <input
            type="text"
            id="strt_address"
            name="strt_address"
            value={address.strt_address}
            onChange={handleChange}
            placeholder="Enter street address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder="Enter state"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="zip_code">Zip Code</label>
          <input
            type="text"
            id="zip_code"
            name="zip_code"
            value={address.zip_code}
            onChange={handleChange}
            placeholder="Enter zip code"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            placeholder="Enter country"
            required
          />
        </div>

        <button type="submit" className="pay-button" disabled={loading}>
          {loading ? "Submitting..." : "Continue to Payment"}
        </button>
      </form>
    </div>
  );
}

export default Address;
