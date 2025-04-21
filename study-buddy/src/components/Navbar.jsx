import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

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

            <div className="nav-right">
                {!currentUser ? (
                    <>
                        <Link to="/signup" className="nav-button">Sign Up</Link>
                        <Link to="/login" className="nav-button login-btn">Log In</Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" className="nav-button">Profile</Link>
                        <button onClick={handleLogout} className="nav-button login-btn">Log Out</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
