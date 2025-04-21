import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../firebase/firebase';

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


function Profile() {
  const { currentUser } = useAuth();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // 
  const [fullName, setFullName] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Save profile to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      fullName,
      major,
      year,
      bio,
      experience,
      email: currentUser?.email,
    };

    try {
      // Upload profile image (optional)
      if (image) {
        const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
        await uploadBytes(storageRef, image);
        const photoURL = await getDownloadURL(storageRef);
        profileData.photoURL = photoURL;
      }

      // Save profile to Firestore
      await setDoc(doc(db, "users", currentUser.uid), profileData);
      alert("Profile saved!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile.");
    }
  };

  // Load saved data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser?.uid) return;
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFullName(data.fullName || '');
        setMajor(data.major || '');
        setYear(data.year || '');
        setBio(data.bio || '');
        setExperience(data.experience || '');
        if (data.photoURL) setPreview(data.photoURL);
      }
    };
    fetchProfile();
  }, [currentUser]);

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

        {/* Full Name */}
        <label>Full Name</label>
        <input 
          type="text" 
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required 
        />

        {/* Email (read-only) */}
        <label>Email (read-only)</label>
        <input 
          type="email" 
          value={currentUser?.email || ''} 
          readOnly 
        />

        {/* Major */}
        <label>Major</label>
        <input 
          type="text" 
          placeholder="Computer Science"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />

        {/* Year Dropdown */}
        <label>Year</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          <option>Freshman</option>
          <option>Sophomore</option>
          <option>Junior</option>
          <option>Senior</option>
          <option>Graduate</option>
        </select>

        {/* Bio */}
        <label>Bio</label>
        <textarea 
          placeholder="Tell us about yourself..." 
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>

        {/* Experience */}
        <label>Experience</label>
        <textarea 
          placeholder="List any experience here..."
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <button type="submit" className="btn-maroon">Save Profile</button>
      </form>
    </div>
  );
}

export default Profile;