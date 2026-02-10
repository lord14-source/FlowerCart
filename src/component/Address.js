import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Address.css";

function Address() {
  const [address, setAddress] = useState({
    name: "",
    strt_address: "",
    city: "",
    state: "",
    zip_code: "",
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
      const response = await fetch("http://localhost:8080/flower/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      if (!response.ok) {
        throw new Error("Failed to submit address");
      }

      // ⏳ Show loader for 2 seconds, then move to payment
      setTimeout(() => {
        navigate("/payment");
      }, 2000);

    } catch (error) {
      console.error("Error submitting address:", error);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="address-container">
      <h2 className="address-header">Enter Shipping Address</h2>

      <form onSubmit={handleSubmit} className="address-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={address.name}
            onChange={handleChange}
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
            required
          />
        </div>

        <button type="submit" className="pay-button" disabled={loading}>
          {loading ? "Saving address..." : "Continue to Payment"}
        </button>
      </form>

      {/* Optional full-screen loader */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
          <p>Saving address, please wait...</p>
        </div>
      )}
    </div>
  );
}

export default Address;
