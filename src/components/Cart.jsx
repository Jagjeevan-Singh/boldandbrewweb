import { FaTrashAlt, FaHeart } from 'react-icons/fa';
import './Cart.css';

function Cart({ cartItems = [], onRemove, onUpdateQuantity, onMoveToWishlist }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>🛒 Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          {/* Left: Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.mainImage} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="brand">{item.brand}</p>
                  <p className="price">₹{item.price} × {item.quantity} = <strong>₹{item.price * item.quantity}</strong></p>
                  
                  <div className="cart-actions">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>

                  <div className="item-options">
                    <button onClick={() => onMoveToWishlist(item)}><FaHeart /> Move to Wishlist</button>
                    <button className="remove-btn" onClick={() => onRemove(item.id)}><FaTrashAlt /> Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Items Total: <strong>₹{subtotal}</strong></p>
            <input type="text" placeholder="Apply Coupon Code" />
            <button className="apply-btn">Apply Coupon</button>
            <hr />
            <h4>Grand Total: <span>₹{subtotal}</span></h4>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;