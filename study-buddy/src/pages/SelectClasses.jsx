import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import '../styles/SelectClasses.css';

function SelectClasses() {
  const { currentUser } = useAuth();

  // State to store all classes from the database
  const [classList, setClassList] = useState([]);

  // State to store the currently selected class IDs
  const [selectedClasses, setSelectedClasses] = useState([]);

  // State for the search bar input
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all classes and the user's current classes on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all available classes
        const querySnapshot = await getDocs(collection(db, 'classes'));
        const classes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClassList(classes);

        // Fetch user’s selected classes from Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setSelectedClasses((userData.classes || []).map(cls => cls.id));
        }
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    fetchData();
  }, [currentUser]);

  // Add a class to the selected list
  const handleAdd = (classId) => {
    if (!selectedClasses.includes(classId)) {
      setSelectedClasses(prev => [...prev, classId]);
    }
  };

  // Remove a class from the selected list
  const handleRemove = (classId) => {
    setSelectedClasses(prev => prev.filter(id => id !== classId));
  };

  // Save the selected classes to the user's Firestore document
  const handleSave = async () => {
    try {
      // Get full class objects from selected IDs
      const selectedClassObjects = classList
        .filter(cls => selectedClasses.includes(cls.id))
        .map(cls => ({
          id: cls.id,
          name: cls.name,
        }));
  
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { classes: selectedClassObjects });
  
      alert('Classes saved successfully!');
    } catch (err) {
      console.error('Error saving classes:', err);
      alert('Failed to save classes.');
    }
  };

  // Filter all classes based on the search input
  const filteredClasses = classList.filter(cls =>
    cls.name.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  // Classes already selected by the user
  const userClassTiles = classList.filter(cls => selectedClasses.includes(cls.id));

  // Remaining classes available to be selected
  const availableClasses = filteredClasses.filter(cls => !selectedClasses.includes(cls.id));

  return (
    <div className="select-classes-container">
      {/* Current semester classes section */}
      <h2>Your Current Semester Classes</h2>
      <div className="tile-grid current-classes">
        {userClassTiles.map(cls => (
          <div key={cls.id} className="class-tile selected">
            <p>{cls.name}</p>
            <div className="button-wrapper">
              <button
                className="bottom-button delete"
                onClick={() => handleRemove(cls.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Search bar */}
      <h2>Select the Classes you're taking this Semester.</h2>
      <input
        type="text"
        placeholder="Search for a class (e.g., AI, Web, Security)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="class-search"
      />

      {/* Available class selection section */}
      <div className="tile-grid">
        {availableClasses.map((cls) => (
          <div key={cls.id} className="class-tile">
            <p>{cls.name}</p>
            <div className="button-wrapper">
              <button
                className="bottom-button add"
                onClick={() => handleAdd(cls.id)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save button */}
      <button onClick={handleSave} className="btn-maroon save-btn">Save Classes</button>
    </div>
  );
}

export default SelectClasses;
