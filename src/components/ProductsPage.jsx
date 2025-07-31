import { useNavigate } from 'react-router-dom';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import './ProductsPage.css';

function ProductsPage({ products, onAdd, onWishlist }) {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <section className="products-page">
      <h2>All Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
          >
            <img
              src={product.mainImage}
              alt={product.name}
              className="product-image"
              onClick={() => handleProductClick(product)}
            />
            <h3 onClick={() => handleProductClick(product)}>{product.name}</h3>
            <p className="price">
              ₹{product.price}
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice}</span>
              )}
            </p>
            <div className="product-actions">
              <button onClick={() => onAdd(product)}>
                <FaCartPlus /> Add to Cart
              </button>
              <button onClick={() => onWishlist(product)}>
                <FaHeart /> Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;