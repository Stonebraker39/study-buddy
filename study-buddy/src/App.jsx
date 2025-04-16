import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Classes from './pages/Classes';
import Support from './pages/Support';

function App() {
  return (
    <Router>
      <div className="app-content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/support" element={<Support />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
