import React from 'react';
import '../styles/Login.css';
import loginImage from '../assets/Login1.png';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-split-container">

      {/* Left Side Form */}
      <div className="login-left">
        <div className="login-form-box">
          <h2 className="login-heading">Welcome back to Study Buddy.</h2>
          <h1>Log In</h1>
          <form>
            <label>Email</label>
            <input type="email" placeholder="Name@nmsu.edu" required />

            <label>Password</label>
            <input type="password" placeholder="*********" required />

            <button className="btn-maroon" type="submit">Login</button>
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
