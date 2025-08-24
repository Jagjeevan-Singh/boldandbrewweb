// src/components/Login.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth';
import './Login.css';


function Login({ onLogin }) {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin();
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('Recaptcha verified');
        },
      });
    }
  };

  const sendOTP = async () => {
    if (!phone) return alert('Enter a valid phone number');
    setupRecaptcha();
    try {
      const result = await signInWithPhoneNumber(auth, '+91' + phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      alert('OTP sent!');
    } catch (error) {
      alert(error.message);
    }
  };

  const verifyOTP = async () => {
    if (!otp || !confirmationResult) return alert('Enter OTP');
    try {
      await confirmationResult.confirm(otp);
      onLogin();
      navigate('/');
    } catch (error) {
      alert('Invalid OTP');
    }
  };

  const handleRegister = async () => {
    if (!email || !password) return alert('Enter email and password');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onLogin();
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert('Logged out');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {user ? (
          <>
            <h2>Welcome, {user.phoneNumber || user.displayName || user.email}</h2>
            <button className="btn logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <h2>Login or Register</h2>
            <button className="btn google" onClick={handleGoogleLogin}>Sign In with Google</button>
            <div className="divider">OR</div>

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
            />
            <button className="btn otp" onClick={sendOTP}>Send OTP</button>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input"
            />
            <button className="btn verify" onClick={verifyOTP}>Verify OTP</button>

            <div className="divider">OR</div>

            <input
              type="email"
              placeholder="Email for Register"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            <button className="btn register" onClick={handleRegister}>Register with Email</button>
          </>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}

export default Login;
