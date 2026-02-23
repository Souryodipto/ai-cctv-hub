import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
    {
        icon: '📷',
        title: 'Old CCTVs',
        desc: 'Your existing cameras remain untouched',
        color: 'rgba(255,255,255,0.7)',
    },
    {
        icon: '🔌',
        title: 'Hub Connect',
        desc: 'AI CCTV Hub connects via ethernet',
        color: '#FF9933',
    },
    {
        icon: '🧠',
        title: 'AI Processing',
        desc: 'Edge AI analyzes all feeds in real-time',
        color: '#9B67CA',
    },
    {
        icon: '📱',
        title: 'Dashboard',
        desc: 'View live insights on mobile & web',
        color: '#138808',
    },
    {
        icon: '⚡',
        title: 'Alerts',
        desc: 'Instant notifications for any threat',
        color: '#FFD700',
    },
];

export default function HowItWorks() {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <section id="how-it-works" ref={ref} className="section" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            {/* Background accent */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '600px', height: '300px',
                background: 'radial-gradient(ellipse, rgba(255,153,51,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <span className="chip" style={{ marginBottom: '1rem' }}>⚙️ How It Works</span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: 'Poppins', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}
                    >
                        <span style={{ color: '#fff' }}>Simple Setup.</span>
                        <br />
                        <span className="gradient-text-india">Powerful Results.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '500px', margin: '0 auto' }}
                    >
                        No camera replacement. No complex wiring. Just connect and let AI do the rest.
                    </motion.p>
                </div>

                {/* Steps flow */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0',
                    position: 'relative',
                }}>
                    {steps.map((step, i) => (
                        <React.Fragment key={step.title}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem', minWidth: '140px', maxWidth: '160px' }}
                            >
                                {/* Icon circle */}
                                <motion.div
                                    animate={inView ? { scale: [1, 1.08, 1] } : {}}
                                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                                    style={{
                                        width: '80px', height: '80px', borderRadius: '50%',
                                        background: `radial-gradient(circle, ${step.color}22, transparent)`,
                                        border: `2px solid ${step.color}66`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '2rem',
                                        boxShadow: `0 0 20px ${step.color}33`,
                                        position: 'relative',
                                    }}
                                >
                                    {step.icon}
                                    {/* Step number */}
                                    <div style={{
                                        position: 'absolute', top: '-8px', right: '-8px',
                                        width: '22px', height: '22px', borderRadius: '50%',
                                        background: step.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.65rem', fontWeight: 800, color: '#000',
                                    }}>{i + 1}</div>
                                </motion.div>

                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: step.color, marginBottom: '0.25rem', fontFamily: 'Poppins' }}>{step.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{step.desc}</div>
                                </div>
                            </motion.div>

                            {/* Arrow connector */}
                            {i < steps.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={inView ? { opacity: 1 } : {}}
                                    transition={{ duration: 0.4, delay: (i + 0.5) * 0.15 }}
                                    style={{ display: 'flex', alignItems: 'center', padding: '0 0.25rem' }}
                                >
                                    <div style={{ position: 'relative', width: '60px', height: '2px', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255,153,51,0.3), rgba(19,136,8,0.3))' }} />
                                        <motion.div
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
                                            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, #FF9933, transparent)' }}
                                        />
                                    </div>
                                    <div style={{ fontSize: '1rem', color: 'rgba(255,153,51,0.6)', marginLeft: '2px' }}>›</div>
                                </motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    style={{ textAlign: 'center', marginTop: '3.5rem' }}
                >
                    <div className="glass-card" style={{ display: 'inline-block', padding: '1.25rem 2.5rem' }}>
                        <span style={{ color: '#FF9933', fontWeight: 700 }}>Installation time:</span>
                        <span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: '0.5rem' }}>Under 2 hours for up to 16 cameras</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
