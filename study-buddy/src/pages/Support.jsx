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
        subject: '',
        priority: 'Normal',
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

            {/* 📍 New text below image */}
            <p className="support-subtext">
                Our support team is here Monday through Friday, 9 AM to 5 PM (Mountain Time).
                Please allow up to 24 hours for a response. Thanks for your patience!
            </p>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="support-form">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Subject</label>
                    <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="support-select"
                    >
                        <option value="">Select a subject</option>
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="Account Help">Account Help</option>
                        <option value="Feedback">Feedback</option>
                        <option value="General Question">General Question</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Priority</label>
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        required
                        className="support-select"
                    >
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                    </select>

                    <label>Message</label>
                    <textarea
                        name="message"
                        rows="5"
                        value={form.message}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="btn-maroon">Submit Request</button>
                </form>
            ) : (
                <p className="success-message">
                    ✅ Thanks! Your message was sent. We'll get back to you soon.
                </p>
            )}
        </div>
    );
}

export default Support;
