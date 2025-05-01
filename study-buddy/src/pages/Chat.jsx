import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import '../styles/Chat.css';

function Chat() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch messages and listen for new ones in real time
  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  // Send a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(db, 'chats'), {
        text: newMessage,
        sender: currentUser.displayName || 'Unknown',
        createdAt: new Date()
      });
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="chat-container">
      <h1>Study Buddy Chat 💬</h1>

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className="chat-message">
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>

      <form className="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
