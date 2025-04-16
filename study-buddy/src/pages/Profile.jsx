import React, { useState } from 'react';
import '../styles/Profile.css';

function Profile() {
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
    // You would send this data to backend here
  };

  return (
    <div className="profile-container">
      <h1>Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-image-upload">
          <label htmlFor="pfp">Profile Picture</label>
          <input type="file" id="pfp" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="profile-preview" />}
        </div>

        <label>Full Name</label>
        <input type="text" placeholder="John Doe" required />

        <label>Major</label>
        <input type="text" placeholder="Computer Science" />

        <label>Year</label>
        <select>
          <option>Freshman</option>
          <option>Sophomore</option>
          <option>Junior</option>
          <option>Senior</option>
          <option>Graduate</option>
        </select>

        <label>Bio</label>
        <textarea placeholder="Tell us about yourself..."></textarea>

        <button type="submit" className="btn-maroon">Save Profile</button>
      </form>
    </div>
  );
}

export default Profile;
