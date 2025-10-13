import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Basket.css';

const Basket = ({ basket }) => {
  useEffect(() => {
    console.log('Basket contents updated:', basket);
  }, [basket]); // This ensures the log runs whenever basket changes

  return (
    <div className="basket-container">
      <h2>Your Basket</h2>
      {basket.length === 0 ? (
        <p className="empty-basket">Your basket is empty.</p>
      ) : (
        <ul className="basket-list">
          {basket.map((item, index) => (
            <li key={index} className="basket-item">
              <img src={item.image} alt={item.name} className="basket-item-image" />
              <div className="basket-item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="basket-item-price">{item.price}</p>
              </div>

              {/* Link to Buy page, passing the product item directly */}
              <Link
                to={{
                  pathname: '/buy',
                  state: { product: item }, // Pass the product as state to the buy page
                }}
                className="buy-button"
                style={{
                  marginBottom: '25px',
                  marginTop: '2px',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                Buy
              </Link>
            </li>
          ))}
        </ul>
      )}
      {basket.length > 0 && (
        <Link to={'/Address'} className="checkout-button">
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
};

export default Basket;
