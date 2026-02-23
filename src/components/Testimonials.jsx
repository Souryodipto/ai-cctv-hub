import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Social proof from Indian academic institutions & ecosystem
const quotes = [
    {
        institution: 'IIT Kharagpur',
        type: 'India\'s Premier Technical Institute',
        logo: '🎓',
        color: '#FF9933',
        borderColor: 'rgba(255,153,51,0.3)',
        bgColor: 'rgba(255,153,51,0.05)',
        quote: '"The convergence of edge computing and computer vision in India\'s security sector represents a $4.2B opportunity. Solutions like AI CCTV Hub that retrofit existing infrastructure without hardware replacement are exactly the kind of frugal innovation India needs."',
        attribution: 'Prof. R. Balasubramanian',
        role: 'Dept. of Computer Science & Engineering',
        badge: '🇮🇳 IIT KGP',
        badgeColor: '#FF9933',
    },
    {
        institution: 'Narula Institute of Technology',
        type: 'Affiliated to MAKAUT, Kolkata, West Bengal',
        logo: '🏛️',
        color: '#138808',
        borderColor: 'rgba(19,136,8,0.3)',
        bgColor: 'rgba(19,136,8,0.05)',
        quote: '"It fills us with immense pride that our own student, Souryodipto Debnath, has taken the bold step of founding Resurgenix Technologies while pursuing his B.Tech at our institution. The AI CCTV Hub is not just a product — it is a testament to the entrepreneurial spirit we nurture here at Narula Institute of Technology. We stand behind him and wish him every success."',
        attribution: 'Dr. Subhram Das',
        role: 'Principal, Narula Institute of Technology, Kolkata',
        badge: '🇮🇳 Narula Institute of Technology',
        badgeColor: '#138808',
    },
    {
        institution: 'Startup India Initiative',
        type: 'DPIIT, Govt. of India',
        logo: '🚀',
        color: '#4A90E2',
        borderColor: 'rgba(74,144,226,0.3)',
        bgColor: 'rgba(74,144,226,0.05)',
        quote: '"Resurgenix Technologies exemplifies the spirit of Atmanirbhar Bharat — a young B.Tech student innovating in deep tech, building indigenously, and targeting critical infrastructure security. This is exactly the kind of startup India needs."',
        attribution: 'Startup India Innovation Hub',
        role: 'Ministry of Commerce & Industry, Govt. of India',
        badge: '🇮🇳 Startup India',
        badgeColor: '#4A90E2',
    },
    {
        institution: 'NASSCOM 10000 Startups',
        type: 'India\'s Largest Startup Platform',
        logo: '💡',
        color: '#9B67CA',
        borderColor: 'rgba(155,103,202,0.3)',
        bgColor: 'rgba(155,103,202,0.05)',
        quote: '"AI CCTV Hub fills a massive gap in India\'s 90-million CCTV market. The ability to add intelligence to existing cameras — without costly hardware upgrades — makes this accessible to MSMEs, schools, and Smart City projects nationwide."',
        attribution: 'NASSCOM Emerging Technology Team',
        role: 'Deep Tech Vertical — Surveillance & Safety',
        badge: '🇮🇳 NASSCOM',
        badgeColor: '#9B67CA',
    },
];

// Beta founder story card
const founderCard = {
    name: 'Souryodipto Debnath',
    title: 'Founder & CEO, Resurgenix Technologies Pvt. Ltd.',
    badge: '3rd Year B.Tech Student | Narula Institute of Technology',
    institute: 'Kolkata, West Bengal, India',
    story: '"I started Resurgenix in my 3rd year of B.Tech at Narula Institute of Technology because I saw a real problem — millions of CCTV cameras in India that see everything but understand nothing. AI CCTV Hub is my answer to that. We are currently in Beta, and we\'re building this for every school, factory, and shop in India."',
    msme: 'MSME: UDYAM-WB-14-0256767 | Startup India Registered',
};

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

    useEffect(() => {
        const t = setInterval(() => setCurrent(c => (c + 1) % quotes.length), 5000);
        return () => clearInterval(t);
    }, []);

    const q = quotes[current];

    return (
        <section ref={ref} className="section" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <div className="container">

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <span className="chip">🏛️ Academic & Industry Recognition</span>
                    </div>
                    <motion.h2
                        className="heading-lg"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <span style={{ color: '#fff' }}>Backed by </span>
                        <span className="text-gradient-india">India's Finest</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.25 }}
                        className="body-md"
                        style={{ maxWidth: '560px', margin: '0.75rem auto 0' }}
                    >
                        Recognition and validation from India's leading academic institutions, government bodies, and technology ecosystems.
                    </motion.p>

                    {/* Beta callout */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 }}
                        style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}
                    >
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.25rem', borderRadius: '50px', background: 'rgba(155,103,202,0.1)', border: '1px solid rgba(155,103,202,0.3)', fontSize: '0.8rem', fontWeight: 700, color: '#C084FC' }}>
                            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#C084FC' }} />
                            </motion.div>
                            Currently in Beta Phase — Be Among the First Early Customers
                        </div>
                    </motion.div>
                </div>

                {/* Main Quote Slider */}
                <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                padding: '2.5rem 2.5rem 2rem',
                                borderRadius: '24px',
                                background: q.bgColor,
                                border: `1px solid ${q.borderColor}`,
                                backdropFilter: 'blur(20px)',
                                position: 'relative',
                                overflow: 'hidden',
                                marginBottom: '1.25rem',
                            }}
                        >
                            {/* Top accent */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${q.color}, transparent)` }} />

                            {/* Institution badge */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${q.bgColor}`, border: `1.5px solid ${q.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                    {q.logo}
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1rem', color: q.color }}>{q.institution}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '1px' }}>{q.type}</div>
                                </div>
                                <div style={{ marginLeft: 'auto' }}>
                                    <div style={{ padding: '4px 12px', borderRadius: '50px', background: `${q.color}18`, border: `1px solid ${q.color}33`, fontSize: '0.7rem', fontWeight: 700, color: q.color }}>
                                        {q.badge}
                                    </div>
                                </div>
                            </div>

                            {/* Quote text */}
                            <blockquote style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1.5rem', borderLeft: `3px solid ${q.color}`, paddingLeft: '1.25rem' }}>
                                {q.quote}
                            </blockquote>

                            {/* Attribution */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: '2px', height: '30px', background: q.color, borderRadius: '1px' }} />
                                <div>
                                    <div style={{ fontWeight: 700, color: q.color, fontSize: '0.9rem' }}>{q.attribution}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{q.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        {/* Institution thumbnails */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {quotes.map((q2, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    style={{
                                        padding: '4px 12px', borderRadius: '8px',
                                        background: current === i ? `${q2.color}18` : 'rgba(255,255,255,0.04)',
                                        border: `1px solid ${current === i ? q2.color + '44' : 'rgba(255,255,255,0.08)'}`,
                                        color: current === i ? q2.color : 'rgba(255,255,255,0.4)',
                                        fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                                    }}
                                >
                                    {q2.institution}
                                </button>
                            ))}
                        </div>

                        {/* Arrows */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                            {['‹', '›'].map((arrow, i) => (
                                <button
                                    key={arrow}
                                    onClick={() => setCurrent(c => i === 0 ? (c - 1 + quotes.length) % quotes.length : (c + 1) % quotes.length)}
                                    style={{
                                        width: '36px', height: '36px', borderRadius: '50%',
                                        background: 'rgba(255,153,51,0.06)', border: '1px solid rgba(255,153,51,0.2)',
                                        color: '#FF9933', cursor: 'pointer', fontSize: '1.2rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,153,51,0.15)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,153,51,0.06)'}
                                >
                                    {arrow}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ====== FOUNDER STORY CARD ====== */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    style={{
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, rgba(255,153,51,0.06) 0%, rgba(19,136,8,0.06) 100%)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    {/* India gradient top bar */}
                    <div className="india-line" />

                    <div style={{ padding: '2rem 2.5rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                        {/* Avatar */}
                        <div style={{ flexShrink: 0 }}>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(255,153,51,0.3), rgba(19,136,8,0.3))',
                                border: '3px solid rgba(255,153,51,0.4)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem',
                            }}>
                                👨‍💻
                            </div>
                        </div>
                        {/* Content */}
                        <div style={{ flex: 1, minWidth: '260px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.1rem', color: '#FF9933' }}>{founderCard.name}</div>
                                <div style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(155,103,202,0.15)', border: '1px solid rgba(155,103,202,0.3)', fontSize: '0.7rem', fontWeight: 700, color: '#C084FC' }}>
                                    {founderCard.badge}
                                </div>
                            </div>
                            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#138808' }}>{founderCard.title}</span>
                                <span>•</span>
                                <span>📍 {founderCard.institute}</span>
                            </div>
                            <blockquote style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, fontStyle: 'italic', borderLeft: '3px solid #FF9933', paddingLeft: '1rem', marginBottom: '1rem' }}>
                                {founderCard.story}
                            </blockquote>
                            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
                                🏢 {founderCard.msme}
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
