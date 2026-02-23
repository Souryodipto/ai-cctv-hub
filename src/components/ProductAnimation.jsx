import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
    { icon: '👥', title: 'People Counting', desc: 'Real-time occupancy tracking', color: '#FF9933' },
    { icon: '🔥', title: 'Fire Detection', desc: 'Early fire & smoke alerts', color: '#FF4444' },
    { icon: '🔫', title: 'Weapon Detection', desc: 'Instant weapon identification', color: '#FF6B35' },
    { icon: '🧠', title: 'Behavior Analysis', desc: 'AI-powered behavioral insights', color: '#138808' },
    { icon: '📊', title: 'Crowd Monitoring', desc: 'Crowd density heatmaps', color: '#9B67CA' },
    { icon: '⚡', title: 'Real-time Alerts', desc: 'Instant mobile notifications', color: '#FFD700' },
];

export default function ProductAnimation() {
    const [activeFeature, setActiveFeature] = useState(0);
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % features.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section
            id="product"
            ref={ref}
            style={{ padding: "5rem 0", position: 'relative', overflow: 'hidden' }}
        >
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: 3D Product Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        style={{ display: 'flex', justifyContent: 'center', perspective: '1000px' }}
                    >
                        <div style={{ position: 'relative', width: '320px', height: '320px' }}>
                            {/* Outer rotating ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    position: 'absolute', inset: '-20px',
                                    borderRadius: '50%',
                                    border: '1px solid rgba(255,153,51,0.2)',
                                    borderTopColor: '#FF9933',
                                }}
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    position: 'absolute', inset: '-40px',
                                    borderRadius: '50%',
                                    border: '1px dashed rgba(19,136,8,0.2)',
                                    borderBottomColor: '#138808',
                                }}
                            />

                            {/* Center hub */}
                            <motion.div
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                style={{
                                    width: '100%', height: '100%',
                                    borderRadius: '28px',
                                    background: 'linear-gradient(135deg, rgba(255,153,51,0.08), rgba(19,136,8,0.08))',
                                    border: '2px solid rgba(255,153,51,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'column', gap: '1rem',
                                    backdropFilter: 'blur(20px)',
                                    boxShadow: '0 0 60px rgba(255,153,51,0.15), 0 0 120px rgba(19,136,8,0.08)',
                                    position: 'relative',
                                }}
                            >
                                {/* Device icon */}
                                <div style={{ fontSize: '4rem' }}>🖥️</div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.1rem', color: '#FF9933' }}>AI CCTV Hub</div>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem' }}>Edge Computing Device</div>
                                </div>
                                {/* Pulsing dot */}
                                <div style={{ position: 'relative' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#138808', boxShadow: '0 0 10px #138808' }} />
                                    <motion.div
                                        animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#138808' }}
                                    />
                                </div>

                                {/* LIVE badge */}
                                <div style={{
                                    position: 'absolute', top: '1rem', right: '1rem',
                                    padding: '3px 10px', borderRadius: '50px',
                                    background: 'rgba(19,136,8,0.2)', border: '1px solid rgba(19,136,8,0.4)',
                                    fontSize: '0.65rem', fontWeight: 700, color: '#1DB81D',
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                }}>
                                    <motion.div
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                        style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#1DB81D' }}
                                    />
                                    LIVE
                                </div>
                            </motion.div>

                            {/* Orbiting feature icons */}
                            {features.map((f, i) => {
                                const angle = (i / features.length) * Math.PI * 2 - Math.PI / 2;
                                const radius = 175;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;
                                return (
                                    <motion.div
                                        key={f.title}
                                        animate={activeFeature === i ? { scale: 1.3, opacity: 1 } : { scale: 0.85, opacity: 0.5 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            position: 'absolute',
                                            left: `calc(50% + ${x}px - 22px)`,
                                            top: `calc(50% + ${y}px - 22px)`,
                                            width: '44px', height: '44px',
                                            borderRadius: '12px',
                                            background: activeFeature === i ? `rgba(${f.color === '#FF9933' ? '255,153,51' : f.color === '#138808' ? '19,136,8' : '255,68,68'},0.2)` : 'rgba(255,255,255,0.05)',
                                            border: `1px solid ${activeFeature === i ? f.color : 'rgba(255,255,255,0.1)'}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.2rem',
                                            cursor: 'pointer',
                                            boxShadow: activeFeature === i ? `0 0 20px ${f.color}44` : 'none',
                                        }}
                                        onClick={() => setActiveFeature(i)}
                                        title={f.title}
                                    >
                                        {f.icon}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right: Feature info */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="section-label" style={{ marginBottom: '1.5rem' }}>
                            🤖 AI Feature Showcase
                        </div>
                        <h2 style={{ fontFamily: 'Poppins', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '1rem' }}>
                            <span style={{ color: '#fff' }}>One Hub.</span>
                            <br />
                            <span className="gradient-text-india">Infinite Intelligence.</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', lineHeight: 1.7 }}>
                            Connect your existing CCTV cameras to our AI processing hub and unlock the power of computer vision — without replacing any hardware.
                        </p>

                        {/* Active feature display */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFeature}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="glass-card-saffron"
                                style={{ padding: '1.5rem', marginBottom: '1.5rem' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ fontSize: '2.5rem' }}>{features[activeFeature].icon}</div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: features[activeFeature].color }}>{features[activeFeature].title}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{features[activeFeature].desc}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Feature dots */}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {features.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveFeature(i)}
                                    style={{
                                        width: activeFeature === i ? '24px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        background: activeFeature === i ? '#FF9933' : 'rgba(255,255,255,0.2)',
                                        transition: 'all 0.3s',
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
