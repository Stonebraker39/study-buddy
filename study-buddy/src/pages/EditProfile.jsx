import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function EditProfile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [username, setUsername] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      username,
      fullName,
      major,
      year,
      bio,
      experience,
      email: currentUser?.email,
    };

    try {
      if (image) {
        const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
        await uploadBytes(storageRef, image);
        const photoURL = await getDownloadURL(storageRef);
        profileData.photoURL = photoURL;
      }

      await setDoc(doc(db, 'users', currentUser.uid), profileData, { merge: true });
      alert('Profile saved!');
      navigate('/home');
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Failed to save profile.');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser?.uid) return;
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUsername(data.username || '');
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

        {/* Profile Picture Preview (centered at top) */}
        {preview && (
          <div className="profile-preview-wrapper">
            <img src={preview} alt="Preview" className="profile-preview" />
          </div>
        )}

        {/* Upload New Profile Picture */}
        <div className="profile-image-upload">
          <label htmlFor="pfp">Profile Picture</label>
          <input type="file" id="pfp" accept="image/*" onChange={handleImageChange} />
        </div>

        {/* Username Field */}
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label>Email</label>
        <input type="email" value={currentUser?.email || ''} readOnly />

        <label>Major</label>
        <select value={major} onChange={(e) => setMajor(e.target.value)} required>
          <option value="">Select Major</option>

          {/* Bachelor Degrees */}
          <option>Computer Science (Algorithm Theory) - Bachelor of Science</option>
          <option>Computer Science (Artificial Intelligence) - Bachelor of Science</option>
          <option>Computer Science (Big Data and Data Science) - Bachelor of Science</option>
          <option>Computer Science (Computer Networking) - Bachelor of Science</option>
          <option>Computer Science (Cybersecurity) - Bachelor of Science</option>
          <option>Computer Science (Human Computer Interaction) - Bachelor of Science</option>
          <option>Computer Science (Secondary Education) - Bachelor of Arts</option>
          <option>Computer Science (Software Development) - Bachelor of Science</option>
          <option>Computer Science - Bachelor of Arts</option>
          <option>Computer Science - Bachelor of Science</option>
          <option>Cybersecurity - Bachelor of Science</option>

          {/* Master Degrees */}
          <option>Bioinformatics - Master of Science</option>
          <option>Computer Science - Master of Science</option>
          <option>Computer Science - Master of Science (Online)</option>
          <option>Data Analytics (Digital Agriculture) - Master of Data Analytics (Online)</option>
          <option>Data Analytics - Master of Data Analytics</option>
          <option>Data Analytics - Master of Data Analytics (Online)</option>

          {/* Doctoral Degrees */}
          <option>Computer Science - Doctor of Philosophy</option>
        </select>

        <label>Year</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          <option>Freshman</option>
          <option>Sophomore</option>
          <option>Junior</option>
          <option>Senior</option>
          <option>Graduate</option>
        </select>

        <label>Bio</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

        <label>Experience</label>
        <textarea value={experience} onChange={(e) => setExperience(e.target.value)} />

        <button type="submit" className="btn-maroon">Save Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;
