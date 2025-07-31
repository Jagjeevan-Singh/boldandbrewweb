import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import './Wishlist.css';

function Wishlist({ items = [], onRemove, onMoveToCart }) {
  return (
    <section className="wishlist-page">
      <h2>Your Wishlist</h2>
      {items.length === 0 ? (
        <p className="empty-msg">No favorites yet.</p>
      ) : (
        <div className="wishlist-container">
          {items.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img
                src={item.mainImage}
                alt={item.name}
                className="wishlist-image"
              />
              <div className="wishlist-details">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
                <div className="wishlist-actions">
                  <button className="move-btn" onClick={() => onMoveToCart(item)}>
                    <FaShoppingCart /> Move to Cart
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(item.id)}
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;