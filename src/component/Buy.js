import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Buy.css';

const Buy = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Get product from location.state

  // State for quantity
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p>No product selected.</p>;
  }

  // Calculate total price
  const totalPrice = parseFloat(product.price.replace('$', '')) * quantity;

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div className="buy-page">
      <h2>Buy Product</h2>
      <div className="product-details">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          width="150"
        />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="product-price">
            <strong>Price: {product.price}</strong>
          </div>
        </div>
      </div>

      {/* Quantity input */}
      <div className="quantity-selector">
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </div>

      {/* Display total price */}
      <div className="total-price" style={{marginBottom:"30px"}}>
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>

      <Link to={"/address"} type="submit" className="pay-button" style={{marginTop:"130px"}}>
          Continue to Payment
        </Link>    </div>
  );
};

export default Buy;
