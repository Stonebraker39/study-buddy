import React, { useState } from 'react';
import '../styles/Login.css';
import loginImage from '../assets/Login1.png';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/firebase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Login failed. Check your email and password.');
    }
  };

  return (
    <div className="login-split-container">
      {/* Left Side Form */}
      <div className="login-left">
        <div className="login-form-box">
          <h2 className="login-heading">Welcome back to Study Buddy.</h2>
          <h1>Log In</h1>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Name@nmsu.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />

            <label>Password</label>
            <input 
              type="password" 
              placeholder="*********" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />

            <button className="btn-maroon" type="submit">Login</button>

            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
          </form>

          <p className="alt-signup-text">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="login-right">
        <img src={loginImage} alt="Login visual" />
      </div>
    </div>
  );
}

export default Login;
