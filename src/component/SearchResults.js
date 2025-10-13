import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query'); // Get the search query from URL

  // Simulate product data
  const products = [
    { id: 1, name: 'Red-Rose', image: 'image/flower1.jpeg' },
    { id: 2, name: 'Voilet-Lily', image: 'image/flower2.jpeg' },
    { id: 3, name: 'Voilet-Flower', image: 'image/flower3.jpeg' },
    { id: 4, name: 'Flower-Basket', image: 'image/flower4.jpeg' },
    { id: 5, name: 'Sun-Flower', image: 'image/flower5.jpeg' },
    { id: 6, name: 'Red-Jasmine', image: 'image/flower6.jpeg' },
  ];

  // Filter products based on the search query
  const searchResults = products.filter((product) =>
    product.name.toLowerCase().includes(query?.toLowerCase() || '')
  );

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((product) => (
            <li key={product.id} style={{ marginBottom: '20px', listStyleType: 'none' }}>
              <h2>{product.name}</h2>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px' }} 
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
