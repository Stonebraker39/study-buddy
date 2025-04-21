import React, { useState } from 'react';
import '../styles/Profile.css';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { currentUser } = useAuth();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated (frontend only for now)!");
    // Send this data to Firestore/Firebase backend later
  };

  return (
    <div className="profile-container">
      <h1>Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        {/* Profile Picture Upload */}
        <div className="profile-image-upload">
          <label htmlFor="pfp">Profile Picture</label>
          <input type="file" id="pfp" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="profile-preview" />}
        </div>

        {/* Display Name */}
        <label>Full Name</label>
        <input 
          type="text" 
          placeholder="John Doe" 
          defaultValue={currentUser?.displayName || ''} 
          required 
        />

        {/* Email - Read-only */}
        <label>Email (read-only)</label>
        <input 
          type="email" 
          value={currentUser?.email || ''} 
          readOnly 
        />

        {/* Major */}
        <label>Major</label>
        <input type="text" placeholder="Computer Science" />

        {/* Year Dropdown */}
        <label>Year</label>
        <select>
          <option>Freshman</option>
          <option>Sophomore</option>
          <option>Junior</option>
          <option>Senior</option>
          <option>Graduate</option>
        </select>

        {/* Bio */}
        <label>Bio</label>
        <textarea placeholder="Tell us about yourself..."></textarea>

        {/* Submit Button */}
        <button type="submit" className="btn-maroon">Save Profile</button>
      </form>
    </div>
  );
}

export default Profile;
