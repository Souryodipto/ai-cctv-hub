import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
    { value: 99.2, suffix: '%', label: 'Detection Accuracy', color: '#FF9933' },
    { value: 2, suffix: 'ms', label: 'Alert Response Time', color: '#138808' },
    { value: 500, suffix: '+', label: 'Beta Registrations', color: '#9B67CA' },
    { value: 24, suffix: '/7', label: 'Always Monitoring', color: '#FFD700' },
];


function AnimatedCounter({ value, suffix, color, duration = 2000, inView }) {
    const [count, setCount] = useState(0);
    const startedRef = useRef(false);

    useEffect(() => {
        if (!inView || startedRef.current) return;
        startedRef.current = true;
        const startTime = Date.now();
        const step = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value * 10) / 10);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, value, duration]);

    return (
        <span style={{ color, fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            {value % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}{suffix}
        </span>
    );
}

export default function StatsSection() {
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

    return (
        <section ref={ref} style={{ padding: '5rem 1.5rem', position: 'relative' }}>
            {/* Full width colored band */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,153,51,0.05), rgba(19,136,8,0.05))',
                borderTop: '1px solid rgba(255,153,51,0.1)',
                borderBottom: '1px solid rgba(19,136,8,0.1)',
            }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    textAlign: 'center',
                }}>
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            style={{ padding: '1.5rem' }}
                        >
                            <AnimatedCounter {...stat} inView={inView} />
                            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', fontWeight: 500 }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
