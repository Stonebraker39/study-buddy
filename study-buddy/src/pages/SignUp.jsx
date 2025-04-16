import React from 'react';
import '../styles/SignUp.css';
import signupImage from '../assets/SignUp1.png';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="signup-split-container">
      
      {/* Left Side Image */}
      <div className="signup-left">
        <img src={signupImage} alt="Study group" />
      </div>

      {/* Right Side Form */}
      <div className="signup-right">
        <div className="signup-form-box">
          <h2 className="signup-heading">Take the stress out of studying. Join Study Buddy.</h2>
          <h1>Create Account</h1>
          <form>
            <label>Birthday</label>
            <input type="date" required />

            <label>Email</label>
            <input type="email" placeholder="Name@nmsu.edu" required />

            <label>Username</label>
            <input type="text" placeholder="Username123" required />

            <label>Password</label>
            <input type="password" placeholder="*********" required />

            <button className="btn-maroon" type="submit">Sign Up for Free</button>
          </form>

          <p className="alt-login-text">
            Already have an account?{' '}
            <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
