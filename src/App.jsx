import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Layout from './components/Layout';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import ProductLanding from './components/ProductLanding';
import ProductsPage from './components/ProductsPage';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
// import Login from './components/Login';
import About from './components/About';
import RecipeSection from './components/RecipeSection';
import RecipePage from './components/RecipePage';
import ContactUs from './components/ContactUs.jsx';

import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import espressoImg from './assets/espresso.jpg';
import cappuccinoImg from './assets/cappuccino.jpg';
import latteImg from './assets/latte.jpg';
import logo from './assets/logo.png';

import DotGrid from './blocks/Backgrounds/DotGrid/DotGrid.jsx';
import {CircularText} from './blocks/TextAnimations/CircularText/CircularText.jsx';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [animationDone, setAnimationDone] = useState(false);

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
    const timer = setTimeout(() => {
      setAnimationDone(true);
    }, 3100);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      return existing
        ? prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { ...product, quantity: 1 }];
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
    <>


      {/* Logo animation before app loads */}
      {!animationDone && (
        <div id="logo-anim-container" style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
          <img id="logo-anim" src={logo} alt="Bold & Brew Logo" />
        </div>
      )}

      {/* Main App Content Layer */}
      <div
        className="app-container"
        style={{
          opacity: animationDone ? 1 : 0,
          transition: 'opacity 1s ease-in',
          position: 'relative',
          zIndex: 1,
        }}
      >
          {/* Background Layer */}
      <div style={{ height:'100vh', position: 'fixed', inset: 0, zIndex: 0 , width: '100%'}}>
        <DotGrid
          dotSize={2.5}
          gap={20}
          baseColor="#b19d8e"
          activeColor="#1c1c1c"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={500}
          returnDuration={3}
        />
      </div>
        <Router>
          <Routes>
            {/* Routes WITHOUT layout can go here */}
            {/* <Route path="/login" element={<Login />} /> */}

            {/* Home Page */}
            <Route
              path="/"
              element={
                <Layout cartCount={cartCount} wishlistCount={wishlistItems.length}>
                  <Banner />
                  <ProductList
                    products={products}
                    onAdd={addToCart}
                    onWishlist={addToWishlist}
                  />
                  <RecipeSection />
                </Layout>
              }
            />
            {/* Other Pages */}
            <Route
              path="/products"
              element={
                <Layout cartCount={cartCount} wishlistCount={wishlistItems.length}>
                  <ProductsPage
                    products={products}
                    onAdd={addToCart}
                    onWishlist={addToWishlist}
                  />
                </Layout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <Layout cartCount={cartCount} wishlistCount={wishlistItems.length}>
                  <ProductLanding
                    products={products}
                    onAddToCart={addToCart}
                    onAddToWishlist={addToWishlist}
                  />
                </Layout>
              }
            />
            <Route
              path="/wishlist"
              element={
                <Layout cartCount={cartCount} wishlistCount={wishlistItems.length}>
                  <Wishlist
                    items={wishlistItems}
                    onRemove={removeFromWishlist}
                    onMoveToCart={moveToCart}
                  />
                </Layout>
              }
            />
            <Route
              path="/recipe/:type"
              element={
                <Layout cartCount={cartCount} wishlistCount={wishlistItems.length}>
                  <RecipePage />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout cartCount={cartCount} wishlistCount={wishlistItems.length}>
                  <About />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout cartCount={cartCount} wishlistCount={wishlistItems.length}>
                  <ContactUs />
                </Layout>
              }
            />
                  
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
