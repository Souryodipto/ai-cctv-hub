import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const useCases = [
    {
        icon: '🏫',
        title: 'Schools',
        desc: 'Protect students with unauthorised entry detection, weapon alerts, and attendance tracking.',
        highlight: 'Student Safety',
        color: '#FF9933',
    },
    {
        icon: '🏪',
        title: 'Retail Stores',
        desc: 'Reduce theft with behavior analysis, track footfall, and analyze shopper patterns.',
        highlight: 'Loss Prevention',
        color: '#138808',
    },
    {
        icon: '🏭',
        title: 'Factories',
        desc: 'Monitor safety zones, detect PPE compliance, and track worker behavior.',
        highlight: 'Worker Safety',
        color: '#9B67CA',
    },
    {
        icon: '🏙️',
        title: 'Smart Cities',
        desc: 'Crowd management, traffic flow analysis, and public safety monitoring at scale.',
        highlight: 'City Intelligence',
        color: '#00B4D8',
    },
    {
        icon: '🏬',
        title: 'Warehouses',
        desc: 'Perimeter security, unauthorized access detection, and safety compliance.',
        highlight: 'Asset Security',
        color: '#FFD700',
    },
    {
        icon: '🏠',
        title: 'Homes',
        desc: 'Smart home security with face recognition, intruder alerts, and package monitoring.',
        highlight: 'Home Security',
        color: '#FF6B35',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function UseCases() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="use-cases" ref={ref} style={{ padding: "5rem 0", position: 'relative' }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="chip" style={{ marginBottom: '1rem' }}>🎯 Use Cases</div>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: 'Poppins', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}
                    >
                        <span style={{ color: '#fff' }}>Built for </span>
                        <span className="gradient-text-saffron">Every</span>
                        <br />
                        <span className="gradient-text-green">Indian Business</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '550px', margin: '0 auto' }}
                    >
                        From small shops to smart cities — AI CCTV Hub scales to fit your needs.
                    </motion.p>
                </div>

                {/* Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.25rem',
                    }}
                >
                    {useCases.map((uc) => (
                        <motion.div
                            key={uc.title}
                            variants={cardVariants}
                            className="glass-card"
                            style={{
                                padding: '1.75rem',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                cursor: 'default',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = `0 20px 40px ${uc.color}22`;
                                e.currentTarget.style.borderColor = `${uc.color}33`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                            }}
                        >
                            {/* Top accent line */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${uc.color}, transparent)` }} />

                            <div style={{ display: 'flex', align: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                                    background: `${uc.color}18`,
                                    border: `1px solid ${uc.color}33`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem',
                                }}>
                                    {uc.icon}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff', fontFamily: 'Poppins' }}>{uc.title}</div>
                                    <div style={{ fontSize: '0.7rem', color: uc.color, fontWeight: 600, letterSpacing: '0.05em' }}>{uc.highlight}</div>
                                </div>
                            </div>

                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                                {uc.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
