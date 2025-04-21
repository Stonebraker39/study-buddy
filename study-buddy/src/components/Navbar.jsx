import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import '../styles/Navbar.css';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState(null);

  // Fetch profile picture from Firestore when user logs in
  useEffect(() => {
    const fetchProfilePic = async () => {
      // Clear old profile photo when user changes
      setPhotoURL(null);

      if (currentUser?.uid) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.photoURL) {
            setPhotoURL(data.photoURL);
          }
        }
      }
    };

    fetchProfilePic();
  }, [currentUser]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="navbar">
      {/* === Left side: Logo and Navigation Links === */}
      <div className="nav-left">
        <Link to="/" className="logo">Study Buddy</Link>

        {currentUser && (
          <div className="nav-links">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/classes" className="nav-link">Classes</Link>
            <Link to="/chat" className="nav-link">Chat</Link>
            <Link to="/support" className="nav-link">Support</Link>
          </div>
        )}
      </div>

      {/* === Right side: Profile or Auth Buttons === */}
        <div className="nav-right">
        {!currentUser ? (
            // Not logged in: Show Sign Up & Log In
            <>
            <Link to="/signup" className="nav-button">Sign Up</Link>
            <Link to="/login" className="nav-button login-btn">Log In</Link>
            </>
        ) : (
            // Logged in: Show profile picture or "Edit Profile", and Log Out
            <>
            {photoURL ? (
                <Link to="/edit-profile">
                <img 
                    src={photoURL} 
                    alt="Profile" 
                    className="nav-profile-img" 
                />
                </Link>
            ) : (
                <Link to="/edit-profile" className="nav-button">
                Edit Profile
                </Link>
            )}
            <button onClick={handleLogout} className="nav-button login-btn">Log Out</button>
            </>
        )}
        </div>
    </nav>
  );
}

export default Navbar;
