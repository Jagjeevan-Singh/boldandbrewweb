import { Link } from 'react-router-dom'
import { FaShoppingCart, FaHeart, FaUser, FaInfoCircle, FaCoffee } from 'react-icons/fa'
import logo from '../assets/logo.png'

function Header({ cartCount = 0, wishlistCount = 0 }) {
  return (
    <header className="header">
      {/* Logo links to home */}
      <div className="nav-left">
        <Link to="/">
          <img src={logo} alt="Bold & Brew Logo" className="logo" />
        </Link>
      </div>

      {/* Navbar Links */}
      <nav className="nav-links">
        <Link to="/products">
          <FaCoffee /> Products
        </Link>

        <Link to="/wishlist">
          <FaHeart /> Wishlist
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>

        <Link to="/cart">
          <FaShoppingCart /> Cart
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>

        <Link to="/about">
          <FaInfoCircle /> About
        </Link>

        <Link to="/login">
          <FaUser /> Login
        </Link>
      </nav>
    </header>
  )
}

export default Header