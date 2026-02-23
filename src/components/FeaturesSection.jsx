import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
    {
        icon: '👥',
        title: 'People Counting',
        desc: 'Track exact headcount in real-time across all zones. Monitor entry/exit flows and get occupancy reports automatically.',
        color: '#FF9933',
        glow: 'rgba(255,153,51,0.25)',
    },
    {
        icon: '🔥',
        title: 'Fire Detection',
        desc: 'Early warning fire and smoke detection using thermal AI models. Alerts dispatched within milliseconds.',
        color: '#FF4444',
        glow: 'rgba(255,68,68,0.25)',
    },
    {
        icon: '🔫',
        title: 'Weapon Detection',
        desc: 'Computer vision models trained to detect firearms, knives, and suspicious objects before threats escalate.',
        color: '#FF6B35',
        glow: 'rgba(255,107,53,0.25)',
    },
    {
        icon: '🧠',
        title: 'Behavior Analysis',
        desc: 'Detect loitering, unusual behavior, fights, and trespassing automatically using behavioral AI.',
        color: '#138808',
        glow: 'rgba(19,136,8,0.25)',
    },
    {
        icon: '📊',
        title: 'Crowd Monitoring',
        desc: 'Generate real-time crowd density heatmaps and alerts when safe capacity thresholds are exceeded.',
        color: '#9B67CA',
        glow: 'rgba(155,103,202,0.25)',
    },
    {
        icon: '⚡',
        title: 'Real-time Alerts',
        desc: 'Instant push notifications to mobile, email, and SMS when any AI model triggers an alert.',
        color: '#FFD700',
        glow: 'rgba(255,215,0,0.25)',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function FeaturesSection() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="features" ref={ref} className="section" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <span className="chip" style={{ marginBottom: '1rem' }}>🤖 AI Capabilities</span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: 'Poppins', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}
                    >
                        <span style={{ color: '#fff' }}>Powerful </span>
                        <span className="gradient-text-saffron">AI Features</span>
                        <br />
                        <span style={{ color: '#fff' }}>Built for </span>
                        <span className="gradient-text-green">India</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="body-md" style={{ maxWidth: '600px', margin: '0 auto' }}
                    >
                        Six powerful AI modules running simultaneously on your existing camera infrastructure.
                    </motion.p>
                </div>

                {/* Feature cards */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            className="glass-card"
                            style={{ padding: '2rem', transition: 'all 0.3s ease', cursor: 'default' }}
                            onMouseEnter={e => {
                                e.currentTarget.style.border = `1px solid ${feature.color}44`;
                                e.currentTarget.style.boxShadow = `0 0 30px ${feature.glow}`;
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '16px',
                                background: `${feature.glow}`,
                                border: `1px solid ${feature.color}44`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.75rem', marginBottom: '1.25rem',
                            }}>
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: feature.color, marginBottom: '0.6rem', fontFamily: 'Poppins' }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                {feature.desc}
                            </p>

                            {/* Status badge */}
                            <div style={{
                                marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                padding: '4px 12px', borderRadius: '50px',
                                background: `${feature.glow}`,
                                border: `1px solid ${feature.color}33`,
                                fontSize: '0.7rem', fontWeight: 600, color: feature.color,
                            }}>
                                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: feature.color }} />
                                AI Active
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
