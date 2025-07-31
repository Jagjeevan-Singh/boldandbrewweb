import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import ProductLanding from './components/ProductLanding';
import ProductsPage from './components/ProductsPage';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Login from './components/Login';
import About from './components/About';
import RecipeSection from './components/RecipeSection';
import RecipePage from './components/RecipePage';
import { auth } from './firebase';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import espressoImg from './assets/espresso.jpg';
import cappuccinoImg from './assets/cappuccino.jpg';
import latteImg from './assets/latte.jpg';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const [products] = useState([
    {
      id: 1,
      name: 'Espresso',
      brand: 'Bold & Brew',
      price: 120,
      originalPrice: 240,
      description: 'A strong, rich, and aromatic espresso to kickstart your day.',
      mainImage: espressoImg,
      images: [espressoImg],
    },
    {
      id: 2,
      name: 'Cappuccino',
      brand: 'Bold & Brew',
      price: 150,
      originalPrice: 300,
      description: 'Creamy and foamy cappuccino, the perfect blend of coffee and milk.',
      mainImage: cappuccinoImg,
      images: [cappuccinoImg],
    },
    {
      id: 3,
      name: 'Latte',
      brand: 'Bold & Brew',
      price: 160,
      originalPrice: 320,
      description: 'Smooth latte with silky milk foam, ideal for a relaxing moment.',
      mainImage: latteImg,
      images: [latteImg],
    },
  ]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setLoggedIn(true);
      else setLoggedIn(false);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (id, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addToWishlist = (product) => {
    setWishlistItems((prev) =>
      prev.find((item) => item.id === product.id) ? prev : [...prev, product]
    );
  };

  const moveToWishlist = (product) => {
    removeFromCart(product.id);
    addToWishlist(product);
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToCart = (product) => {
    removeFromWishlist(product.id);
    addToCart(product);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="app-container">
        <Header cartCount={cartCount} wishlistCount={wishlistItems.length} />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <ProductList
                    products={products}
                    onAdd={addToCart}
                    onWishlist={addToWishlist}
                  />
                  <RecipeSection />
                </>
              }
            />
            <Route
              path="/products"
              element={
                <ProductsPage
                  products={products}
                  onAdd={addToCart}
                  onWishlist={addToWishlist}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductLanding
                  products={products}
                  onAddToCart={addToCart}
                  onAddToWishlist={addToWishlist}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateCartQuantity}
                  onMoveToWishlist={moveToWishlist}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  items={wishlistItems}
                  onRemove={removeFromWishlist}
                  onMoveToCart={moveToCart}
                />
              }
            />
            <Route path="/recipe/:type" element={<RecipePage />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={
                !loggedIn ? (
                  <Login onLogin={() => setLoggedIn(true)} />
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h2>You are already logged in</h2>
                  </div>
                )
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;