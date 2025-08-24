import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaHeart } from 'react-icons/fa';
import { CircularText } from '../blocks/TextAnimations/CircularText/CircularText.jsx';
import './Header.css';
import { useState } from 'react';
import logo from '../assets/logo.png';
import SideBar from './SideBar';

function Header({ cartCount = 0, wishlistCount = 0 }) {
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
      <SideBar />
      {/* Left: Circular Text Logo */}
      <div className="nav-left">
        <NavLink to="/" className="circular-logo">
          <div className="circular-logo-wrapper">
            <img src={logo} alt="Bold & Brew Logo" className="center-logo" />
            <CircularText
              text="Bold&Brew * Bold&Brew * "
              onHover="goBonkers"
              spinDuration={12}
              className="circular-text"
            />
          </div>
        </NavLink>
      </div>
      {/* Right: Icons or Search */}
      <div className="nav-right">
        {!showSearch && (
          <button className="icon-navlink" onClick={handleSearchClick}>
            <FaSearch />
          </button>
        )}
        {showSearch && (
          <form onSubmit={handleSearchSubmit} className="search-form">
            <label htmlFor="header-search" className="visually-hidden">Search</label>
            <input
              id="header-search"
              name="search"
              type="text"
              className="search-input"
              autoFocus
              placeholder='What are you looking for?'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={handleSearchBlur}
              autoComplete="off"
            />
          </form>
        )}
        <NavLink to="/wishlist" className="icon-navlink">
          <FaHeart />
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </NavLink>
        <NavLink to="/cart" className="icon-navlink">
          <FaShoppingCart />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </NavLink>
        <NavLink to="/login" className="icon-navlink">
          <FaUser />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
