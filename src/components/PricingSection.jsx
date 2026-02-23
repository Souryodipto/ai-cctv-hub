import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const plans = [
    {
        name: 'Starter',
        price: '₹20,000',
        period: 'one-time',
        desc: 'Perfect for small shops, homes & schools',
        color: '#138808',
        features: [
            'Up to 4 camera channels',
            '👥 Crowd Count AI',
            '🔥 Fire Detection AI',
            'Real-time mobile alerts',
            'Basic monitoring dashboard',
            '1 year warranty included',
            'Remote support',
        ],
        cta: 'Pre-register',
        popular: false,
    },
    {
        name: 'Business',
        price: '₹60,000',
        period: 'one-time',
        desc: 'Ideal for retail stores, factories & offices',
        color: '#FF9933',
        features: [
            'Up to 16 camera channels',
            '👥 Crowd Count AI',
            '🔥 Fire Detection AI',
            '🚨 Weapon Detection AI',
            '🎭 Behavior Analysis AI',
            'Advanced analytics dashboard',
            '1 year warranty included',
            'Priority support 24/7',
            'On-site installation',
        ],
        cta: 'Get Early Access',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: 'contact us',
        desc: 'For large warehouses, factories & smart cities',
        color: '#9B67CA',
        features: [
            'Unlimited camera channels',
            'All AI modules + custom models',
            'Multi-site management',
            'API access & integrations',
            'Dedicated account manager',
            'Custom warranty & SLA',
        ],
        cta: 'Contact Sales',
        popular: false,
    },
];


export default function PricingSection() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="pricing" ref={ref} style={{ padding: "5rem 0", position: 'relative' }}>
            <div className="container">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="chip" style={{ marginBottom: '1rem' }}>💰 Pricing</div>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: 'Poppins', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}
                    >
                        <span style={{ color: '#fff' }}>Simple, Transparent </span>
                        <span className="gradient-text-saffron">Pricing</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'inline-block', padding: '8px 20px', borderRadius: '50px',
                            background: 'rgba(255,153,51,0.1)', border: '1px solid rgba(255,153,51,0.3)',
                            color: '#FF9933', fontSize: '0.85rem', fontWeight: 600,
                        }}
                    >
                        🚀 Product Under Development — Pre-register for Early Customer Benefits!
                    </motion.div>
                </div>

                {/* Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="glass-card"
                            style={{
                                padding: '2rem',
                                position: 'relative',
                                overflow: 'hidden',
                                border: plan.popular ? `1px solid ${plan.color}44` : '1px solid rgba(255,255,255,0.08)',
                                transform: plan.popular ? 'scale(1.04)' : 'scale(1)',
                                boxShadow: plan.popular ? `0 0 40px ${plan.color}22` : 'none',
                            }}
                        >
                            {/* Popular badge */}
                            {plan.popular && (
                                <div style={{
                                    position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)',
                                    padding: '4px 20px',
                                    background: plan.color,
                                    borderRadius: '0 0 12px 12px',
                                    fontSize: '0.7rem', fontWeight: 800, color: '#000',
                                    letterSpacing: '0.05em',
                                }}>MOST POPULAR</div>
                            )}

                            <div style={{ marginTop: plan.popular ? '1.5rem' : '0' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: plan.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{plan.name}</div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.25rem' }}>
                                    <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2.2rem', color: plan.color }}>{plan.price}</span>
                                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>/ {plan.period}</span>
                                </div>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{plan.desc}</p>

                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                                    {plan.features.map(f => (
                                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                                            <span style={{ color: plan.color, fontWeight: 700, fontSize: '0.8rem' }}>✓</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="#lead-form"
                                    style={{
                                        display: 'block', textAlign: 'center',
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        background: plan.popular ? `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)` : 'transparent',
                                        border: plan.popular ? 'none' : `1px solid ${plan.color}44`,
                                        color: plan.popular ? '#000' : plan.color,
                                        fontWeight: 700, fontSize: '0.9rem',
                                        cursor: 'pointer', textDecoration: 'none',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                >
                                    {plan.cta} →
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', marginTop: '2rem' }}
                >
                    * Prices are indicative. Final pricing will be announced at launch. Early customers get special benefits.
                </motion.p>
            </div>
        </section>
    );
}
