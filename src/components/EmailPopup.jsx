import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeEmail } from '../api/leads';

export default function EmailPopup({ onClose }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) { setError('Please enter your email'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Invalid email address'); return; }
        setLoading(true);
        try {
            await subscribeEmail(email);
            setSubmitted(true);
        } catch {
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    background: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '1rem',
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    onClick={e => e.stopPropagation()}
                    className="glass-card"
                    style={{
                        maxWidth: '440px', width: '100%', padding: '2.5rem',
                        border: '1px solid rgba(255,153,51,0.2)',
                        position: 'relative', overflow: 'hidden',
                    }}
                >
                    {/* Top accent */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #FF9933, #fff, #138808, transparent)' }} />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute', top: '1rem', right: '1rem',
                            width: '28px', height: '28px', borderRadius: '50%',
                            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.9rem', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    >✕</button>

                    {!submitted ? (
                        <>
                            {/* Icon */}
                            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚀</div>
                                <h3 style={{ fontFamily: 'Poppins', fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                                    Get <span style={{ color: '#FF9933' }}>Early Access</span>
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                    Subscribe to stay updated on our launch. Early subscribers get{' '}
                                    <span style={{ color: '#138808', fontWeight: 600 }}>exclusive pricing & benefits.</span>
                                </p>
                            </div>

                            {/* Benefits */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                {['🎯 Priority access at launch', '💰 Exclusive early customer pricing', '📞 Direct founder contact'].map(b => (
                                    <div key={b} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        {b}
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <input
                                    className="form-input"
                                    type="email"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); setError(''); }}
                                    placeholder="Enter your email address"
                                />
                                {error && <div style={{ color: '#FF4444', fontSize: '0.75rem' }}>{error}</div>}
                                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', zIndex: 1, opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}>
                                    {loading ? 'Subscribing...' : '✉️ Subscribe for Early Access'}
                                </button>
                            </form>

                            <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', marginTop: '0.75rem' }}>
                                No spam. Unsubscribe anytime. 🇮🇳 Made in India
                            </p>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                            <h3 style={{ fontFamily: 'Poppins', fontSize: '1.3rem', fontWeight: 800, color: '#138808', marginBottom: '0.75rem' }}>
                                You're on the List!
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                We'll reach out when we're ready to launch. Watch out for early customer advantages! 🎉
                            </p>
                            <button onClick={onClose} className="btn-primary" style={{ marginTop: '1.5rem', zIndex: 1 }}>
                                Close
                            </button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
