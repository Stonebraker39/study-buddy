// src/pages/PostStudyRequest.jsx
import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import '../styles/PostStudyRequest.css';

function PostStudyRequest() {
  const { currentUser } = useAuth();
  const [classes, setClasses] = useState([]);
  const [userClassIds, setUserClassIds] = useState([]);
  const [form, setForm] = useState({
    classId: '',
    topic: '',
    day: '',
    time: '',
    maxParticipants: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get all available classes
        const querySnapshot = await getDocs(collection(db, 'classes'));
        const allClasses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClasses(allClasses);

        // Step 2: Get current user's selected class IDs
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserClassIds(userData.classes || []);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'studyRequests'), {
        ...form,
        createdBy: currentUser.uid,
        createdAt: new Date()
      });
      alert('Study session posted!');
      setForm({ classId: '', topic: '', day: '', time: '', maxParticipants: '' });
    } catch (err) {
      console.error('Failed to post:', err);
      alert('Error posting study session.');
    }
  };

  // Filter class options to only those the user is registered for
  const filteredClasses = classes.filter(cls =>
    userClassIds.some(userClass => typeof userClass === 'string'
      ? userClass === cls.id
      : userClass.id === cls.id)
  );  

  return (
    <div className="study-request-container">
      <h2>Find a Study Buddy</h2>
      <form onSubmit={handleSubmit} className="study-request-form">
        <label>
          Class:
          <select name="classId" value={form.classId} onChange={handleChange} required>
            <option value="">Select a class</option>
            {filteredClasses.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </label>
        <label>
          Topic:
          <input type="text" name="topic" value={form.topic} onChange={handleChange} required />
        </label>
        <label>
          Day:
          <input type="date" name="day" value={form.day} onChange={handleChange} required />
        </label>
        <label>
          Time:
          <input type="time" name="time" value={form.time} onChange={handleChange} required />
        </label>
        <label>
          Max Participants:
          <input type="number" name="maxParticipants" value={form.maxParticipants} onChange={handleChange} min="1" required />
        </label>
        <button type="submit" className="submit-btn">Post Study Request</button>
      </form>
    </div>
  );
}

export default PostStudyRequest;
