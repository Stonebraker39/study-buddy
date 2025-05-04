import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../styles/Support.css';

import SupportImage from '../assets/support.jpg';


function Support() {
    const { currentUser } = useAuth();
    const [form, setForm] = useState({
        name: '',
        email: currentUser?.email || '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'supportRequests'), {
                ...form,
                submittedAt: new Date(),
                userId: currentUser?.uid || null
            });
            setSubmitted(true);
        } catch (err) {
            console.error('Support request failed:', err);
            alert('Error submitting your request. Please try again.');
        }
    };

    return (
        <div className="support-container">
            <h1>Contact Support</h1>
            <p>Need help with Study Buddy? Let us know below:</p>
            <img src={SupportImage} alt="Support" className="support-image" />

            {!submitted ? (
                <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                    />

                    <label>Message</label>
                    <textarea
                        name="message"
                        rows="5"
                        value={form.message}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
                    />

                    <button type="submit" className="btn-maroon">Submit Request</button>
                </form>
            ) : (
                <p style={{ fontSize: '1.2rem', marginTop: '40px', color: 'green' }}>
                    ✅ Thanks! Your message was sent. We'll get back to you soon.
                </p>
            )}
        </div>
    );
}

export default Support;
