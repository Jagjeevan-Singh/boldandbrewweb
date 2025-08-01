import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaHeart } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Header.css';
import { useState } from 'react';

function Header({ cartCount = 0 }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleSearchBlur = () => {
    setShowSearch(false);
    setSearchTerm('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // You can redirect or handle search here
      console.log('Search for:', searchTerm);
    }
  };

  return (
    <header className="header">
      {/* Left: Logo */}
      <div className="nav-left">
        <Link to="/">
          <img src={logo} alt="Bold & Brew Logo" className="logo" />
        </Link>
      </div>

      {/* Center: Titles only */}
      <nav className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>

      {/* Right: Icons or Search */}
      <div className="nav-right">
        {!showSearch && (
          <button className="icon-link" onClick={handleSearchClick}>
            <FaSearch />
          </button>
        )} 
         {showSearch && (
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              className="search-input"
              autoFocus
              placeholder='What are you looking for?'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={handleSearchBlur}
            />
          </form>
        )}

        <Link to="/wishlist" className="icon-link">
          <FaHeart />
        </Link>
        <Link to="/cart" className="icon-link">
          <FaShoppingCart />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
        <Link to="/login" className="icon-link">
          <FaUser />
        </Link>
      </div>
    </header>
  );
}

export default Header;
