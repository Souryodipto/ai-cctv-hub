import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#lead-form' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                transition: 'all 0.4s ease',
                background: scrolled ? 'rgba(6,7,16,0.96)' : 'rgba(6,7,16,0.3)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: scrolled ? '1px solid rgba(255,153,51,0.12)' : '1px solid transparent',
                boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
            }}
        >
            {/* Top India color line */}
            <div className="india-line" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

                {/* ====== LOGO ====== */}
                <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', flexShrink: 0 }}>
                    {/* Logo image */}
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src="/logo.png"
                            alt="Resurgenix Technologies Logo"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    {/* Brand name */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1rem', color: '#FF9933', letterSpacing: '-0.01em' }}>AI</span>
                            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1rem', color: '#fff', letterSpacing: '-0.01em' }}> CCTV</span>
                            <span style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1rem', color: '#138808', letterSpacing: '-0.01em' }}> Hub</span>
                        </div>
                        <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em', fontWeight: 500, lineHeight: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            by Resurgenix Technologies
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', padding: '1px 5px', borderRadius: '4px', background: 'rgba(155,103,202,0.15)', border: '1px solid rgba(155,103,202,0.25)', color: '#C084FC', fontWeight: 700, fontSize: '0.52rem', letterSpacing: '0.08em' }}>BETA</span>
                        </div>
                    </div>
                </a>

                {/* ====== DESKTOP NAV ====== */}
                <nav style={{ display: 'none' }} className="md-nav">
                    <style>{`@media (min-width: 900px) { .md-nav { display: flex !important; align-items: center; gap: 2rem; } }`}</style>
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            style={{
                                color: activeLink === link.href ? '#FF9933' : 'rgba(255,255,255,0.65)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                                position: 'relative',
                                paddingBottom: '2px',
                            }}
                            onClick={() => setActiveLink(link.href)}
                            onMouseEnter={e => e.target.style.color = '#FF9933'}
                            onMouseLeave={e => e.target.style.color = activeLink === link.href ? '#FF9933' : 'rgba(255,255,255,0.65)'}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* ====== RIGHT SIDE ====== */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Made in India badge */}
                    <div className="made-in-india" style={{ display: 'none' }} id="mii-badge">
                        <style>{`@media (min-width: 768px) { #mii-badge { display: inline-flex !important; } }`}</style>
                        🇮🇳 Made in India
                    </div>
                    {/* CTA */}
                    <a href="#lead-form" className="btn-primary" style={{ padding: '0.575rem 1.35rem', fontSize: '0.85rem' }}>
                        🚀 Order Now
                    </a>
                    {/* Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            display: 'flex', flexDirection: 'column', gap: '5px',
                            background: 'none', border: 'none', cursor: 'pointer', padding: '6px',
                        }}
                        className="hamburger"
                        aria-label="Toggle menu"
                    >
                        <style>{`@media (min-width: 900px) { .hamburger { display: none !important; } }`}</style>
                        {[0, 1, 2].map(i => (
                            <span key={i} style={{
                                display: 'block', width: '22px', height: '2px', borderRadius: '2px',
                                background: i === 0 ? '#FF9933' : i === 1 ? '#fff' : '#138808',
                                transition: 'all 0.3s',
                                transform: mobileOpen
                                    ? (i === 0 ? 'rotate(45deg) translate(5px,5px)' : i === 1 ? 'scale(0)' : 'rotate(-45deg) translate(5px,-5px)')
                                    : 'none',
                                opacity: mobileOpen && i === 1 ? 0 : 1,
                            }} />
                        ))}
                    </button>
                </div>
            </div>

            {/* ====== MOBILE MENU ====== */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,153,51,0.1)', background: 'rgba(6,7,16,0.99)' }}
                    >
                        <div className="container" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {navLinks.map((link, i) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '0.875rem 0',
                                        borderBottom: i < navLinks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                        color: 'rgba(255,255,255,0.8)', fontSize: '0.9375rem', fontWeight: 500, textDecoration: 'none',
                                    }}
                                >
                                    {link.label}
                                    <span style={{ color: 'rgba(255,153,51,0.5)', fontSize: '1rem' }}>›</span>
                                </a>
                            ))}
                            <div style={{ paddingTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                <a href="#lead-form" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                                    🚀 Order Now
                                </a>
                            </div>
                            <div style={{ paddingTop: '0.75rem', textAlign: 'center' }}>
                                <span className="made-in-india">🇮🇳 Made in India | MSME Registered</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
