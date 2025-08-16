
import { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin();
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-main-wrapper" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
      <div className="login-box" style={{ display: 'flex', background: '#fff', borderRadius: '24px', boxShadow: '0 0 32px rgba(0,0,0,0.08)', maxWidth: 900, width: '100%', padding: '2.5rem 2rem', gap: '2rem', justifyContent: 'center' }}>
        {/* Login Section */}
        <div style={{ flex: 1, minWidth: 320 }}>
          <h2 style={{ textAlign: 'left', color: '#4e342e', marginBottom: 8 }}>Login</h2>
          <div style={{ color: '#444', marginBottom: 24 }}>If you have an account with us, please log in.</div>
          <form onSubmit={handleLogin}>
            <input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button className="btn" type="submit" style={{ background: '#FFD600', color: '#4e342e', fontWeight: 600, fontSize: 18, margin: '16px 0 0 0' }}>Sign In</button>
          </form>
          <div style={{ margin: '18px 0 0 0', display: 'flex', justifyContent: 'center' }}>
            <button className="btn google" style={{ width: '80%', background: '#de5246', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 0 }} onClick={handleGoogleLogin}>
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style={{ width: 28, height: 28, background: '#fff', borderRadius: 4, marginRight: 8, border: '1px solid #eee' }} />
              <span style={{ flex: 1, textAlign: 'center', fontWeight: 500, fontSize: 16 }}>Sign in with Google</span>
            </button>
          </div>
          <div style={{ marginTop: 16, textAlign: 'left' }}>
            <a href="#" style={{ color: '#0066cc', fontSize: 15 }}>Forgot your password?</a>
          </div>
        </div>
        {/* Register Section */}
        <div style={{ flex: 1, minWidth: 320, borderLeft: '1px solid #eee', paddingLeft: 32 }}>
          <h2 style={{ textAlign: 'left', color: '#4e342e', marginBottom: 8 }}>New Customer?</h2>
          <div style={{ color: '#444', marginBottom: 24 }}>
            Registering for this site allows you to access your order status and history. We’ll get a new account set up for you in no time.
          </div>
          <button className="btn" style={{ background: '#17a2b8', color: '#fff', fontWeight: 600, fontSize: 18, width: '100%' }} onClick={() => navigate('/register')}>Create an Account</button>
        </div>
      </div>
    </div>
  );
}

export default Login;