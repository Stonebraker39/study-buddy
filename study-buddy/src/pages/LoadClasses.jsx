import React from 'react';
import { loadClassesToFirebase } from '../utils/loadClassesToFirebase';

function LoadClasses() {
  const handleLoad = () => {
    loadClassesToFirebase()
      .then(() => alert("✅ Classes loaded to Firestore!"))
      .catch(err => {
        console.error("❌ Error loading classes:", err);
        alert("Something went wrong!");
      });
  };

  return (
    <div style={{ paddingTop: '70px', textAlign: 'center' }}>
      <h1>Admin: Load Class List</h1>
      <p>Click the button below to upload CS classes to Firestore.</p>
      <button onClick={handleLoad} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Load Classes to Firebase
      </button>
    </div>
  );
}

export default LoadClasses;
