import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './ProductLanding.css';

function ProductLanding({ products, onAddToCart, onAddToWishlist }) {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product || products.find(p => p.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(product?.mainImage || '');
  const [zoomed, setZoomed] = useState(false);

  if (!product) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Product not found</div>;
  }

  return (
    <div className="product-landing">
      {/* Left thumbnails */}
      <div className="product-images">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.name} ${index}`}
            className="thumb-image"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Center main image */}
      <div className="product-main-image">
        <img
          src={selectedImage}
          alt={product.name}
          onClick={() => setZoomed(true)}
          style={{ cursor: 'zoom-in' }}
        />
      </div>

      {/* Right product details */}
      <div className="product-details">
        <h2>{product.name}</h2>
        <span className="brand">{product.brand}</span>
        <div>
          <span className="price">₹{product.price}</span>
          <span className="discount">₹{product.originalPrice}</span>
        </div>
        <div className="buttons">
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          <button onClick={() => onAddToWishlist(product)}>Add to Wishlist</button>
        </div>
        <div className="description">
          <h4>Description</h4>
          <p>{product.description}</p>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomed && (
        <div className="zoom-overlay" onClick={() => setZoomed(false)}>
          <div className="zoom-popup">
            <img src={selectedImage} alt={product.name} className="zoomed-image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductLanding;