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

  const handleEdit = (post) => {
    alert(`Edit clicked for "${post.topic}"`);
  };

  const myPosts = allPosts.filter(post => post.createdBy === currentUser.uid);
  const relatedPosts = allPosts.filter(
    post =>
      post.createdBy !== currentUser.uid &&
      userClasses.some(cls => typeof cls === 'string' ? cls === post.classId : cls.id === post.classId)
  );

  const getUserName = (uid) => {
    const user = allUsers.find(u => u.uid === uid);
    return user?.username || 'Unknown User';
  };

  return (
    <div className="home-container">
      <h1>Welcome, {currentUser?.displayName || 'Student'} 👋</h1>
      <p>Ready to study smarter? Check out current study requests or post your own!</p>

      <div className="button-wrapper">
        <Link to="/post-study-request" className="btn-maroon">Find a Study Buddy</Link>
      </div>

      {/* My Posts */}
      <div className="study-posts">
        <h2>My Study Posts</h2>
        {myPosts.length === 0 ? <p>No posts yet.</p> : (
          <div className="home-grid">
            {myPosts.map(post => (
              <div key={post.id} className="home-tile">
                <strong>{currentUser?.displayName || 'Me'}</strong> wants help in<br />
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

      {/* Related Posts */}
      <div className="study-posts">
        <h2>Needs Study Buddy</h2>
        {relatedPosts.length === 0 ? <p>No related posts yet.</p> : (
          <div className="home-grid">
            {relatedPosts.map(post => (
              <div key={post.id} className="home-tile">
                <strong>{getUserName(post.createdBy)}</strong> wants help in <strong>{classMap[post.classId]}</strong>
                <p>Topic: {post.topic}</p>
                <p>Date: {post.day}</p>
                <p>Time: {post.time}</p>
                <p>Max Participants: {post.maxParticipants}</p>
                <button className="home1-accept-btn">Accept</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
