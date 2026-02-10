import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import About from './component/About';
import Account from './component/Account';
import Address from './component/Address';
import Basket from './component/Basket';
import Buy from './component/Buy';
import Cancel from './component/Cancel ';
import Footer from './component/footer';
import Header from './component/Header';
import Home from './component/Home';
import Order from './component/Order';
import PaymentPage from './component/PaymentPage';
import ProductGrid from './component/ProductGrid';
import Profile from './component/Profile';
import SearchResults from './component/SearchResults';
import Success from './component/Success';

function App() {
  const [basket, setBasket] = useState([]); // State to manage basket items
  const [products, setProducts] = useState([]); // State to store product details

  // Hardcoded product names and images
  const hardcodedProducts = [
    { id: 1, image: 'image/flower1.jpeg', name: 'Product 1' },
    { id: 2, image: 'image/flower1.jpeg', name: 'Product 2' },
    { id: 3, image: 'image/flower1.jpeg', name: 'Product 3' },
    { id: 4, image: 'image/flower2.jpeg', name: 'Product 4' },
    { id: 5, image: 'image/flower3.jpeg', name: 'Product 5' },
    { id: 6, image: 'image/flower3.jpeg', name: 'Product 6' },
    { id: 7, image: 'image/flower2.jpeg', name: 'Product 7' },
    { id: 8, image: 'image/flower2.jpeg', name: 'Product 8' },
  ];

  // Function to fetch price and description from backend
  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/flower/flowerdata/${productId}`);
      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }
      const data = await response.json();
      return {
        price: data.price || 'N/A',
        description: data.productName || 'No description available',
      };
    } catch (error) {
      console.error('Error fetching product details:', error);
      return { price: 'N/A', description: 'Unable to fetch details' };
    }
  };

  // Function to update products with details
  const updateProducts = async () => {
    const updatedProducts = await Promise.all(
      hardcodedProducts.map(async (product) => {
        const { price, description } = await fetchProductDetails(product.id);
        return { ...product, price, description };
      })
    );
    setProducts(updatedProducts);
  };

  useEffect(() => {
    updateProducts(); // Fetch product details when component mounts
  }, []);

  // Function to add a product to the basket
  const addToBasket = (product) => {
    setBasket((prevBasket) => {
      const updatedBasket = [...prevBasket, product];
      return updatedBasket;
    });
  };

  return (
    <Router>
      <div className="App">
        <Header basketCount={basket.length} />

        <Routes>
          {/* Home route renders the Home and ProductGrid components */}
          <Route
            path="/"
            element={
              <>
                <Home basketCount={basket.length} />
                <ProductGrid products={products} addToBasket={addToBasket} />
              </>
            }
          />
          {/* Basket route displays items in the basket */}
          <Route path="/basket" element={<Basket basket={basket} />} />
          {/* Account  */}
          <Route path="/account" element={<Account />} />
          {/* Order */}
          <Route path="/order" element={<Order />} />
          {/* Buy */}
          <Route path="/buy" element={<Buy />} />
          {/* Address */}
          <Route path="/address" element={<Address />} />
          {/* Search */}
          <Route path="/search" element={<SearchResults />} />
          {/* PaymentPage */}
          <Route path="/payment" element={<PaymentPage />} />
          {/* About page */}
          <Route path="/about" element={<About />} />
          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
           <Route path="/" element={<PaymentPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
