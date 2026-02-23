import React from 'react';
import { motion } from 'framer-motion';

const footerLinks = {
    Product: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Use Cases', href: '#use-cases' },
        { label: 'Pricing', href: '#pricing' },
    ],
    Company: [
        { label: 'About Us', href: '#' },
        { label: 'Our Story', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
    ],
    Legal: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Refund Policy', href: '#' },
        { label: 'Cookie Policy', href: '#' },
    ],
};

const socials = [
    { icon: '𝕏', label: 'X (Twitter)', href: '#' },
    { icon: 'in', label: 'LinkedIn', href: '#' },
    { icon: 'f', label: 'Facebook', href: '#' },
    { icon: '📸', label: 'Instagram', href: '#' },
    { icon: '▶', label: 'YouTube', href: '#' },
];

export default function Footer() {
    return (
        <footer style={{ position: 'relative', zIndex: 10, background: 'rgba(2,3,10,0.98)', borderTop: '1px solid rgba(255,153,51,0.1)' }}>
            {/* India tri-color top line */}
            <div className="india-line" />

            {/* Made in India banner */}
            <div style={{ background: 'linear-gradient(135deg, rgba(255,153,51,0.06), rgba(19,136,8,0.06))', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '0.875rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>
                            <span style={{ fontSize: '1.1rem' }}>🇮🇳</span>
                            <span style={{ fontWeight: 700, color: '#FF9933' }}>Proudly Made in India</span>
                            <span>|</span>
                            <span style={{ fontWeight: 600, color: '#138808' }}>Atmanirbhar Bharat</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <span style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(255,153,51,0.1)', border: '1px solid rgba(255,153,51,0.2)', color: '#FF9933', fontSize: '0.7rem', fontWeight: 700 }}>UDYAM-WB-14-0256767 | Startup India</span>
                            <span style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(155,103,202,0.1)', border: '1px solid rgba(155,103,202,0.2)', color: '#C084FC', fontSize: '0.7rem', fontWeight: 700 }}>Beta Phase</span>
                            <span style={{ padding: '3px 10px', borderRadius: '6px', background: 'rgba(19,136,8,0.1)', border: '1px solid rgba(19,136,8,0.2)', color: '#22C55E', fontSize: '0.7rem', fontWeight: 700 }}>DPIIT Startup</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '4rem 1.5rem 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

                    {/* Brand column */}
                    <div style={{ gridColumn: 'span 1' }}>
                        {/* Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '10px', overflow: 'hidden', background: '#fff', flexShrink: 0 }}>
                                <img src="/logo.png" alt="Resurgenix Technologies" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <div>
                                <div style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1rem' }}>
                                    <span style={{ color: '#FF9933' }}>AI</span>
                                    <span style={{ color: '#fff' }}> CCTV</span>
                                    <span style={{ color: '#138808' }}> Hub</span>
                                </div>
                                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>by Resurgenix Technologies</div>
                            </div>
                        </div>

                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8375rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                            Transforming India's surveillance infrastructure with AI-powered edge computing. <em style={{ color: '#FF9933' }}>Dekhe bhi, Samjhe bhi.</em>
                        </p>

                        {/* Company info */}
                        <div style={{ fontSize: '0.73rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                            <div><span style={{ color: 'rgba(255,153,51,0.6)' }}>Company:</span> Resurgenix Technologies Pvt. Ltd.</div>
                            <div><span style={{ color: 'rgba(255,153,51,0.6)' }}>CIN:</span> U62099WB2026PTC286734</div>
                            <div><span style={{ color: 'rgba(19,136,8,0.6)' }}>UDYAM-WB-14-0256767 | Startup India</span> | West Bengal, India 🇮🇳</div>
                            <div><span style={{ color: 'rgba(155,103,202,0.6)' }}>Status:</span> Currently in Beta Phase</div>
                            <div><span style={{ color: 'rgba(255,153,51,0.6)' }}>Founded by:</span> 3rd Year B.Tech Student</div>
                        </div>

                        {/* Social icons */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {socials.map(s => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    title={s.label}
                                    style={{
                                        width: '34px', height: '34px', borderRadius: '9px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)',
                                        textDecoration: 'none', transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,153,51,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,153,51,0.35)'; e.currentTarget.style.color = '#FF9933'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#FF9933', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.125rem' }}>
                                {title}
                            </div>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                {links.map(link => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
                                            onMouseEnter={e => e.target.style.color = '#fff'}
                                            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact column */}
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#FF9933', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.125rem' }}>
                            Contact Us
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { icon: '📧', text: 'info@resurgenix.in', href: 'mailto:info@resurgenix.in' },
                                { icon: '📞', text: '+91 XXXXX XXXXX', href: 'tel:+91XXXXXXXXXX' },
                                { icon: '📍', text: 'West Bengal, India', href: '#' },
                            ].map(c => (
                                <a key={c.text} href={c.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.color = '#FF9933'; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
                                >
                                    <span>{c.icon}</span>{c.text}
                                </a>
                            ))}

                            {/* Newsletter mini CTA */}
                            <div style={{ marginTop: '0.75rem', padding: '1rem', borderRadius: '12px', background: 'rgba(255,153,51,0.05)', border: '1px solid rgba(255,153,51,0.12)' }}>
                                <div style={{ fontSize: '0.78rem', color: '#FF9933', fontWeight: 700, marginBottom: '0.5rem' }}>🔔 Get Launch Updates</div>
                                <a href="#lead-form" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.2)' }}>
                                    Register as early customer →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="divider" style={{ marginBottom: '1.5rem' }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
                        © 2026 Resurgenix Technologies Pvt. Ltd. All rights reserved. CIN: U62099WB2026PTC286734
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <span className="made-in-india">🇮🇳 Made in India</span>
                        <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '5px', background: 'rgba(155,103,202,0.12)', border: '1px solid rgba(155,103,202,0.2)', color: '#C084FC', fontWeight: 700 }}>BETA</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
