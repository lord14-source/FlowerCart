import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, addToBasket }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToBasket={addToBasket}
        />  
      ))}
    </div>
  );
};

export default ProductGrid;
