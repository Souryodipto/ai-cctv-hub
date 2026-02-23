import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const taglines = [
    { text: 'Dekhe bhi, Samjhe bhi.', color: '#FF9933' },
    { text: 'AI that Protects India.', color: '#138808' },
    { text: 'Edge AI. Real-time Safety.', color: '#4A90E2' },
];

const trustBadges = [
    { icon: '🛡️', text: 'AI-Powered Security' },
    { icon: '⚡', text: 'Real-time Alerts' },
    { icon: '🔌', text: 'Plug & Play' },
    { icon: '📱', text: 'Mobile Dashboard' },
    { icon: '🇮🇳', text: 'Made in India' },
];

export default function HeroSection() {
    const [taglineIdx, setTaglineIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setTaglineIdx(i => (i + 1) % taglines.length), 2800);
        return () => clearInterval(t);
    }, []);

    return (
        <section
            id="home"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '70px',
            }}
        >
            {/* Radial background glows */}
            <div style={{ position: 'absolute', top: '15%', left: '5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,153,51,0.09) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(19,136,8,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,0,128,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>

                    {/* Top badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ display: 'flex', justifyContent: 'center', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '2rem' }}
                    >
                        <span className="chip">🇮🇳 Made in India</span>
                        <span className="chip-beta chip">⚗️ Now in Beta</span>
                        <span className="chip chip-green">✅ MSME Registered</span>
                    </motion.div>

                    {/* Logo in hero */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}
                    >
                        <div style={{ width: '90px', height: '90px', borderRadius: '20px', overflow: 'hidden', background: '#fff', boxShadow: '0 8px 32px rgba(255,153,51,0.25), 0 0 60px rgba(255,153,51,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="/logo.png" alt="Resurgenix Technologies" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.15 }}
                    >
                        <h1 className="heading-xl" style={{ marginBottom: '0.5rem' }}>
                            <span style={{ color: '#fff' }}>Smart </span>
                            <span className="text-gradient-saffron">CCTV</span>
                            <span style={{ color: '#fff' }}> Hub</span>
                        </h1>
                        <div className="india-line" style={{ width: '160px', margin: '0.75rem auto 1.25rem' }} />
                    </motion.div>

                    {/* Animated tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        style={{ height: '2.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.25rem' }}
                    >
                        <motion.p
                            key={taglineIdx}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            style={{ fontFamily: 'Poppins', fontSize: 'clamp(1.25rem, 3.5vw, 2rem)', fontWeight: 700, color: taglines[taglineIdx].color }}
                        >
                            {taglines[taglineIdx].text}
                        </motion.p>
                    </motion.div>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="body-lg"
                        style={{ maxWidth: '680px', margin: '0 auto 2.5rem', color: 'rgba(255,255,255,0.58)' }}
                    >
                        Transform your existing CCTV cameras into an intelligent AI security network —
                        <span style={{ color: '#FF9933', fontWeight: 600 }}> no hardware replacement needed</span>. One small hub. Infinite intelligence.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}
                    >
                        <a href="#lead-form" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                            🚀 Pre-register Now
                        </a>
                        <a href="#how-it-works" className="btn-outline" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                            See How It Works ›
                        </a>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.65, duration: 0.8 }}
                        style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}
                    >
                        {trustBadges.map(b => (
                            <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', fontWeight: 500 }}>
                                <span style={{ fontSize: '1rem' }}>{b.icon}</span>{b.text}
                            </div>
                        ))}
                    </motion.div>

                    {/* Scroll cue */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', marginTop: '4rem' }}
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                            style={{ width: '24px', height: '38px', borderRadius: '12px', border: '2px solid rgba(255,153,51,0.35)', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}
                        >
                            <motion.div
                                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 1.6 }}
                                style={{ width: '4px', height: '8px', borderRadius: '2px', background: '#FF9933' }}
                            />
                        </motion.div>
                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
