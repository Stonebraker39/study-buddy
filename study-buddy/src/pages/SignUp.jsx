import React, { useState } from 'react';
import '../styles/SignUp.css';
import signupImage from '../assets/SignUp1.png';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: username });

      // Save to Firestore
      try {
        await setDoc(doc(db, 'users', userCred.user.uid), {
          username,
          email,
          birthday,
          createdAt: new Date()
        });
      } catch (firestoreError) {
        console.warn('Firestore write failed:', firestoreError.message);
      }

      navigate('/home');
    } catch (err) {
      console.error('Signup error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('That email is already in use. Please log in instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleSignUp}>
            <label>Birthday</label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Name@nmsu.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Username</label>
            <input
              type="text"
              placeholder="Username123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

            <button className="btn-maroon" type="submit" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up for Free'}
            </button>

            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
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
