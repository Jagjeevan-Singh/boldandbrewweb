import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// CORRECTED IMPORTS: Assuming AdminLogin.js and AdminDashboard.js are in the same folder as App.jsx
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import espressoImg from './assets/espresso.jpg';
import cappuccinoImg from './assets/cappuccino.jpg';
import latteImg from './assets/latte.jpg';
import VanillaImg from './assets/Vanilla.jpg';
import HazelnutImg from './assets/Hazelnut.jpg';
import PureImg from './assets/100instant.jpg';
import StrongImg from './assets/7030instant.jpg';

const auth = getAuth();
const db = getFirestore();

const ProtectedAdminRoute = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDocRef = doc(db, 'users', authUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().role === 'owner') {
          setUserRole('owner');
        } else {
          setUserRole('customer');
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return userRole === 'owner' ? children : <Navigate to="/admin-login" />;
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

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
    {
      id: 4,
      name: 'Vanilla Instant Coffee',
      brand: 'Bold & Brew',
      price: 349,
      originalPrice: 499,
      description: 'Rich vanilla flavor combined with premium instant coffee.',
      mainImage: VanillaImg,
      images: [VanillaImg],
    },
    {
      id: 5,
      name: 'Hazelnut Instant Coffee',
      brand: 'Bold & Brew',
      price: 349,
      originalPrice: 499,
      description: 'Indulge in the rich and nutty flavor of hazelnut with our instant coffee.',
      mainImage: HazelnutImg,
      images: [HazelnutImg],
    },
    {
      id: 6,
      name: 'Pure Instant Coffee',
      brand: 'Bold & Brew',
      price: 299,
      originalPrice: 499,
      description: 'Experience the purest form of coffee with our premium instant blend.',
      mainImage: PureImg,
      images: [PureImg],
    },
    {
      id: 7,
      name: 'Strong Instant Coffee',
      brand: 'Bold & Brew',
      price: 249,
      originalPrice: 499,
      description: 'For those who prefer a bolder taste, try our strong instant coffee.',
      mainImage: StrongImg,
      images: [StrongImg],
    },
    {
      id: 8,
      name: 'Vanilla Instant Coffee',
      brand: 'Bold & Brew',
      price: 349,
      originalPrice: 499,
      description: 'Vanilla Flavour Coffee',
      mainImage: VanillaImg,
      images: [VanillaImg],
    },
  ]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedIn(true);
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        setUserRole(userDoc.exists() ? userDoc.data().role : null);
      } else {
        setLoggedIn(false);
        setUserRole(null);
      }
      setLoadingUser(false);
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

  console.log('Cart Items:', cartItems);
  console.log('Wishlist Items:', wishlistItems);

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Header cartCount={cartCount} wishlistCount={wishlistItems.length} />
        <div className="main-content">
          <Routes>
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />

            {/* <Route
              path="/admin-dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
             /> */}


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