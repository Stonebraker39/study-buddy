import React from 'react';
import '../styles/Home.css';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome, {currentUser?.displayName || 'Student'} 👋</h1>
      <p>Ready to study smarter? Check out current study requests or post your own!</p>

      {/* Post a New Request Button */}
      <div className="button-wrapper">
        <Link to="/support" className="btn-maroon">+ Post a Study Request</Link>
      </div>

      {/* Sample Study Posts */}
      <div className="study-posts">
        <h2>Recent Study Posts</h2>
        <ul className="post-list">
          <li>
            <strong>CS 222 – Data Structures</strong><br />
            Looking for a group to review trees and recursion. Meeting on Zoom this weekend.
          </li>
          <li>
            <strong>CS 372 – Algorithms</strong><br />
            Anyone down to go over dynamic programming? I’ll bring snacks!
          </li>
          <li>
            <strong>CS 414 – Databases</strong><br />
            Prepping for the ER diagram quiz. Study session at Zuhl Library, Friday at 2pm.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
