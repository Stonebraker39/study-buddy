import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
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

  // Fetch posts, users, and classes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postSnap = await getDocs(collection(db, 'studyRequests'));
        const posts = postSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllPosts(posts);

        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserClasses(userDoc.data().classes || []);
        }

        const usersSnap = await getDocs(collection(db, 'users'));
        const users = usersSnap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
        setAllUsers(users);

        const classSnap = await getDocs(collection(db, 'classes'));
        const classList = classSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const classLookup = {};
        classList.forEach(cls => classLookup[cls.id] = cls.name);
        setClassMap(classLookup);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [currentUser]);

  // Delete my own study post
  const handleDelete = async (postId) => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'studyRequests', postId));
      setAllPosts(prev => prev.filter(post => post.id !== postId));
      alert('Post deleted.');
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Error deleting post.');
    }
  };

  // Placeholder for editing my post
  const handleEdit = (post) => {
    alert(`Edit clicked for "${post.topic}"`);
  };

  // Accept a study buddy post
  const handleAccept = (post) => {
    if (!acceptedPosts.some(p => p.id === post.id)) {
      setAcceptedPosts(prev => [...prev, post]);
    }
  };

  // Withdraw from an accepted study post
  const handleWithdraw = (post) => {
    setAcceptedPosts(prev => prev.filter(p => p.id !== post.id));
  };

  // Placeholder for starting a chat
  const handleChat = (post) => {
    alert(`Starting chat with ${getUserName(post.createdBy)} about ${post.topic}`);
  };

  // Get user display name from ID
  const getUserName = (uid) => {
    const user = allUsers.find(u => u.uid === uid);
    return user?.username || 'Unknown User';
  };

  // Posts created by me
  const myPosts = allPosts.filter(post => post.createdBy === currentUser.uid);

  // Posts created by others in same classes
  const relatedPosts = allPosts.filter(
    post =>
      post.createdBy !== currentUser.uid &&
      userClasses.some(cls => typeof cls === 'string' ? cls === post.classId : cls.id === post.classId)
  );

  return (
    <div className="home-container">
      {/* Welcome Section */}
      <h1>Welcome, {currentUser?.displayName || 'Student'} 👋</h1>
      <p>Ready to study smarter? Let's start with 3 easy steps:</p>

      {/* Step 1-2-3 Cards */}
      <div className="home-steps">
        <div className="home-step">
          <h3>Step 1: Complete Your Profile ✏️</h3>
          <p>It's important to complete your profile so other students know who you are. Having your name, major, and a little about you helps others feel more comfortable studying with you.</p>
          <Link to="/edit-profile" className="btn-maroon small-btn">Edit Your Profile</Link>
        </div>

        <div className="home-step">
          <h3>Step 2: Register Your Classes 📚</h3>
          <p>After finishing your profile, register the classes you're taking this semester. You'll only be matched with students who are in the same classes as you!</p>
          <Link to="/select-classes" className="btn-maroon small-btn">Register Classes</Link>
        </div>

        <div className="home-step">
          <h3>Step 3: Create a Study Post 📝</h3>
          <p>Creating a study post helps you and others plan sessions to tackle assignments, quizzes, or tough topics together. Let's help each other succeed!</p>
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
                <strong>{currentUser?.displayName || 'Me'}</strong> wants help in <br />
                <strong>{classMap[post.classId]}</strong>
                <p>Topic: {post.topic}</p>
                <p>Date: {post.day}</p>
                <p>Time: {post.time}</p>
                <p>Max Participants: {post.maxParticipants}</p>
                <div className="tile-button-wrapper">
                  <button className="edit-btn" onClick={() => handleEdit(post)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Study Buddy Posts */}
      <div className="study-posts">
        <h2>Needs Study Buddy</h2>
        {relatedPosts.length === 0 ? <p>No related posts yet.</p> : (
          <div className="home-grid">
            {relatedPosts.map(post => {
              const isAccepted = acceptedPosts.some(p => p.id === post.id);
              return (
                <div 
                  key={post.id} 
                  className={`home-tile ${isAccepted ? 'accepted-tile' : ''}`}
                  style={isAccepted ? { opacity: 0.6, pointerEvents: 'none' } : {}}
                >
                  <strong>{getUserName(post.createdBy)}</strong> wants help in <strong>{classMap[post.classId]}</strong>
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

      {/* My Accepted Posts */}
      <div className="study-posts">
        <h2>Accepted Study Posts</h2>
        {acceptedPosts.length === 0 ? (
          <p>No accepted posts yet.</p>
        ) : (
          <div className="home-grid">
            {acceptedPosts.map(post => (
              <div key={post.id} className="home-tile">
                <strong>{getUserName(post.createdBy)}</strong> is studying <strong>{classMap[post.classId]}</strong>
                <p>Topic: {post.topic}</p>
                <p>Date: {post.day}</p>
                <p>Time: {post.time}</p>
                <p>Max Participants: {post.maxParticipants}</p>
                <div className="tile-button-wrapper">
                  {/* Chat now links to Chat.jsx */}
                  <Link 
                    to="/chat" 
                    className="chat-btn"
                    style={{ textDecoration: 'none', display: 'inline-block', padding: '8px 16px' }}
                  >
                    Chat
                  </Link>

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
