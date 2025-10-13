import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, addToBasket }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
    
      <p className="product-description">{product.description}</p>
      <p className="product-price" style={{display:"flex"}}><h5 style={{marginTop:"2px",marginRight:"2px"}}>₹</h5>{product.price}</p>
      
      <button
        style={{
          padding: "8px 16px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12px",
          marginTop:"-5px",
        }}
        onClick={() => addToBasket(product)}
      >
        Add To Cart
      </button>

      {/* Link to the Buy page, passing the product data */}
      <Link
        to="/buy"
        className="buy-button"
        style={{
          marginBottom: "25px",
          marginTop: "2px",
          fontSize: "14px",
          textDecoration: "none",
        }}
        state={{ product }} // Pass the product as state to the buy page
      >
        Buy
      </Link>
    </div>
  );
};

export default ProductCard;
