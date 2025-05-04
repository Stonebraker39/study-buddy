import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Classes from './pages/Classes';
import Support from './pages/Support';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import LoadClasses from './pages/LoadClasses';
import SelectClasses from './pages/SelectClasses';
import PostStudyRequest from './pages/PostStudyRequest';

function App() {
  return (
      <AuthProvider>
        <Router>
          <div className="app-content">
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/support" element={<Support />} />
              <Route path="/home" element={<Home />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/load-classes" element={<LoadClasses />} />
              <Route path="/select-classes" element={<SelectClasses />} />
              <Route path="/post-study-request" element={<PostStudyRequest />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
