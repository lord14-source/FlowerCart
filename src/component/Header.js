import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import logo from './img/Flower-Cart_Logo.jpeg';

const Header = ({ basketCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName'); // ✅ Remove username from local storage
    setUserName(null); // ✅ Clear username from state
    navigate('/'); // ✅ Redirect to home page
  };

  return (
    <header className="home">
      <div className="header-container">
        <div className="header-logo">
          <img src={logo} alt="Flower-Cart Logo" className="logo-image" />
        </div>
        <Link to="/" style={{ marginLeft: '-130px', marginRight: '15px', color: "white", textDecoration: "none" }}>
          FLOWERCART
        </Link>

        <div className="header-search">
          <input
            type="text"
            className="search-input"
            placeholder="Search for flowers, bouquets, and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?query=${searchQuery}`)}
          />
          <button className="search-button" onClick={() => navigate(`/search?query=${searchQuery}`)}>
            Search
          </button>
        </div>

        <div className="header-links">
          {userName ? (
            <>
              <Link to="/profile" className="header-link">Hello, {userName}</Link>
              <button onClick={handleLogout} className="logout-button">Logout</button> {/* ✅ Logout button */}
            </>
          ) : (
            <Link to="/account" className="header-link">Account</Link>
          )}
          <Link to="/order" className="header-link">Orders</Link>
          <Link to="/basket" className="header-link">
            Cart <span className="cart-count">({basketCount})</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
