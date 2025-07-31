import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';
function ProductList({ products, onAdd, onWishlist }) {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <section className="products-section" data-aos="fade-up">
      <h2 className="section-title">☕ Our Coffee</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.mainImage}
              alt={product.name}
              className="product-image"
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            />
            <h3
              className="product-title"
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              {product.name}
            </h3>
            <p className="price">₹{product.price}</p>
            <div className="product-buttons">
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

export default ProductList;