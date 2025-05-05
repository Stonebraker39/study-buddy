import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, deleteDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const { currentUser } = useAuth();
  const [allPosts, setAllPosts] = useState([]);
  const [userClasses, setUserClasses] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [classMap, setClassMap] = useState({});
  const [acceptedPosts, setAcceptedPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editForm, setEditForm] = useState({ topic: '', day: '', time: '', maxParticipants: '' });
  const [userData, setUserData] = useState(null);

  // Load posts, users, classes, accepted posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all study posts
        const postSnap = await getDocs(collection(db, 'studyRequests'));
        const posts = postSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllPosts(posts);

        // Get current user's info
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setUserClasses(data.classes || []);

          // Load accepted post IDs
          if (data.acceptedPosts) {
            const accepted = posts.filter(post => data.acceptedPosts.includes(post.id));
            setAcceptedPosts(accepted);
          }
        }

        // Get all users info
        const usersSnap = await getDocs(collection(db, 'users'));
        const users = usersSnap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
        setAllUsers(users);

        // Get all classes info
        const classSnap = await getDocs(collection(db, 'classes'));
        const classList = classSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const lookup = {};
        classList.forEach(cls => lookup[cls.id] = cls.name);
        setClassMap(lookup);

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [currentUser]);

  // Delete my post
  const handleDelete = async (postId) => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'studyRequests', postId));
      setAllPosts(prev => prev.filter(post => post.id !== postId));
      alert('Post deleted.');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Start editing my post
  const startEditing = (post) => {
    setEditingPostId(post.id);
    setEditForm({ topic: post.topic, day: post.day, time: post.time, maxParticipants: post.maxParticipants });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingPostId(null);
    setEditForm({ topic: '', day: '', time: '', maxParticipants: '' });
  };

  // Save changes to my post
  const saveEdit = async (postId) => {
    try {
      const postRef = doc(db, 'studyRequests', postId);
      await updateDoc(postRef, {
        topic: editForm.topic,
        day: editForm.day,
        time: editForm.time,
        maxParticipants: editForm.maxParticipants,
      });
      setAllPosts(prev => prev.map(post => post.id === postId ? { ...post, ...editForm } : post));
      cancelEditing();
      alert('Post updated!');
    } catch (err) {
      console.error('Update error:', err);
      alert('Error updating post.');
    }
  };

  // Accept a study post
  const handleAccept = async (post) => {
    if (!acceptedPosts.some(p => p.id === post.id)) {
      setAcceptedPosts(prev => [...prev, post]);

      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
          acceptedPosts: arrayUnion(post.id)
        });
      } catch (err) {
        console.error('Accept save error:', err);
      }
    }
  };

  // Withdraw from accepted post
  const handleWithdraw = async (post) => {
    try {
      // 1. Update UI immediately
      setAcceptedPosts(prev => prev.filter(p => p.id !== post.id));

      // 2. Update Firestore too
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedAcceptedPosts = (userData.acceptedPosts || []).filter(id => id !== post.id);

        await updateDoc(userRef, {
          acceptedPosts: updatedAcceptedPosts,
        });
      }
    } catch (err) {
      console.error('Withdraw save error:', err);
    }
  };

  // Get user's name
  const getUserName = (uid) => {
    const user = allUsers.find(u => u.uid === uid);
    return user?.username || 'Unknown User';
  };

  // Get user's email
  const getUserEmail = (uid) => {
    const user = allUsers.find(u => u.uid === uid);
    return user?.email || 'Unavailable';
  };

  // Get user's profile photo
  const getUserPhoto = (uid) => {
    const user = allUsers.find(u => u.uid === uid);
    return user?.photoURL || '/default-avatar.png';
  };

  // Separate posts
  const myPosts = allPosts.filter(post => post.createdBy === currentUser.uid);
  const relatedPosts = allPosts.filter(
    post =>
      post.createdBy !== currentUser.uid &&
      userClasses.some(cls => typeof cls === 'string' ? cls === post.classId : cls.id === post.classId)
  );

  return (
    <div className="home-container">
      {/* Welcome */}
      <h1>Welcome, {userData?.username || 'Student'} 👋</h1>
      <p>Ready to study smarter? Let's start with 3 easy steps:</p>

      {/* 3 Steps */}
      <div className="home-steps">
        <div className="home-step">
          <h3>Step 1: Complete Your Profile ✏️</h3>
          <p>Help others know who you are by filling out your profile.</p>
          <Link to="/edit-profile" className="btn-maroon small-btn">Edit Your Profile</Link>
        </div>
        <div className="home-step">
          <h3>Step 2: Register Your Classes 📚</h3>
          <p>Pick the classes you're taking to find better matches.</p>
          <Link to="/select-classes" className="btn-maroon small-btn">Register Classes</Link>
        </div>
        <div className="home-step">
          <h3>Step 3: Create a Study Post 📝</h3>
          <p>Set up a session and find a study buddy easily!</p>
          <Link to="/post-study-request" className="btn-maroon">Find a Study Buddy</Link>
        </div>
      </div>

      {/* My Study Posts */}
      <div className="study-posts">
        <h2>My Study Posts</h2>
        {myPosts.length === 0 ? <p>No posts yet.</p> : (
          <div className="home-grid">
            {myPosts.map(post => (
              <div key={post.id} className="home-tile">
                {editingPostId === post.id ? (
                  <>
                    <input type="text" value={editForm.topic} onChange={(e) => setEditForm({ ...editForm, topic: e.target.value })} placeholder="Topic" />
                    <input type="text" value={editForm.day} onChange={(e) => setEditForm({ ...editForm, day: e.target.value })} placeholder="Day" />
                    <input type="text" value={editForm.time} onChange={(e) => setEditForm({ ...editForm, time: e.target.value })} placeholder="Time" />
                    <input type="number" value={editForm.maxParticipants} onChange={(e) => setEditForm({ ...editForm, maxParticipants: e.target.value })} placeholder="Max Participants" />
                    <div className="tile-button-wrapper">
                      <button className="edit-btn" onClick={() => saveEdit(post.id)}>Save</button>
                      <button className="delete-btn" onClick={cancelEditing}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={getUserPhoto(post.createdBy)} alt="Profile" className="profile-pic" />
                      <strong>{userData?.username || 'Me'}</strong>
                    </div>
                    <strong> wants help in {classMap[post.classId]}</strong>
                    <p>Topic: {post.topic}</p>
                    <p>Date: {post.day}</p>
                    <p>Time: {post.time}</p>
                    <p>Max Participants: {post.maxParticipants}</p>
                    <div className="tile-button-wrapper">
                      <button className="edit-btn" onClick={() => startEditing(post)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Needs Study Buddy */}
      <div className="study-posts">
        <h2>Needs Study Buddy</h2>
        {relatedPosts.length === 0 ? <p>No related posts yet.</p> : (
          <div className="home-grid">
            {relatedPosts.map(post => {
              const isAccepted = acceptedPosts.some(p => p.id === post.id);
              return (
                <div key={post.id} className={`home-tile ${isAccepted ? 'accepted-tile' : ''}`} style={isAccepted ? { opacity: 0.6, pointerEvents: 'none' } : {}}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={getUserPhoto(post.createdBy)} alt="Profile" className="profile-pic" />
                    <strong>{getUserName(post.createdBy)}</strong>
                  </div>
                  <strong> wants help in {classMap[post.classId]}</strong>
                  <p>Topic: {post.topic}</p>
                  <p>Date: {post.day}</p>
                  <p>Time: {post.time}</p>
                  <p>Max Participants: {post.maxParticipants}</p>
                  {isAccepted ? (
                    <div style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>Accepted ✅</div>
                  ) : (
                    <button className="home1-accept-btn" onClick={() => handleAccept(post)}>Accept</button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Accepted Study Posts */}
      <div className="study-posts">
        <h2>Accepted Study Posts</h2>
        {acceptedPosts.length === 0 ? <p>No accepted posts yet.</p> : (
          <div className="home-grid">
            {acceptedPosts.map(post => (
              <div key={post.id} className="home-tile">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={getUserPhoto(post.createdBy)} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  <strong>{getUserName(post.createdBy)}</strong>
                </div>
                <strong> is studying {classMap[post.classId]}</strong>
                <p>Topic: {post.topic}</p>
                <p>Date: {post.day}</p>
                <p>Time: {post.time}</p>
                <p>Max Participants: {post.maxParticipants}</p>
                <div className="tile-button-wrapper">
                  <p className="email-contact">
                    Contact: <a href={`mailto:${getUserEmail(post.createdBy)}`}>{getUserEmail(post.createdBy)}</a>
                  </p>
                  <button className="withdraw-btn" onClick={() => handleWithdraw(post)}>Withdraw</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Home;
