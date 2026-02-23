import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { submitLead } from '../api/leads';

const purposes = [
    'Home Security',
    'Retail Store',
    'School / College',
    'Factory / Warehouse',
    'Office Building',
    'Smart City Project',
    'Reseller / Distributor',
    'Other',
];

const initialForm = { name: '', email: '', phone: '', purpose: '' };

export default function LeadCaptureForm() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.email.trim()) errs.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
        if (!form.phone.trim()) errs.phone = 'Phone is required';
        else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit Indian mobile number';
        if (!form.purpose) errs.purpose = 'Please select an installation purpose';
        return errs;
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        setLoading(true);
        try {
            await submitLead(form);
            setSubmitted(true);
            setForm(initialForm);
        } catch {
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="lead-form" ref={ref} style={{ padding: '6rem 1.5rem', position: 'relative' }}>
            {/* Glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '700px', height: '400px',
                background: 'radial-gradient(ellipse, rgba(255,153,51,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="max-w-2xl mx-auto relative z-10">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="section-label" style={{ marginBottom: '1rem' }}>📧 Register Interest</div>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: 'Poppins', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem' }}
                    >
                        <span style={{ color: '#fff' }}>Be an </span>
                        <span className="gradient-text-saffron">Early Customer</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}
                    >
                        Register your interest now and get exclusive early customer pricing, priority installation, and direct support from our founding team.
                    </motion.p>
                </div>

                {/* Form card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="glass-card"
                    style={{ padding: '2.5rem', border: '1px solid rgba(255,153,51,0.15)' }}
                >
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ textAlign: 'center', padding: '2rem 0' }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.5 }}
                                    style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
                                >🎉</motion.div>
                                <h3 style={{ fontFamily: 'Poppins', fontSize: '1.5rem', fontWeight: 800, color: '#FF9933', marginBottom: '1rem' }}>
                                    Thank You for Registering!
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                    <strong style={{ color: '#138808' }}>Product is currently under development.</strong>
                                    <br />
                                    We will contact you soon for <span style={{ color: '#FF9933' }}>early customer advantages</span> including special pricing, priority installation, and exclusive features.
                                </p>
                                <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(19,136,8,0.1)', border: '1px solid rgba(19,136,8,0.2)' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                                        🇮🇳 Proud MSME Company | CIN: U62099WB2026PTC286734
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    style={{ marginTop: '1.5rem', background: 'transparent', border: '1px solid rgba(255,153,51,0.3)', color: '#FF9933', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem' }}
                                >
                                    Submit Another
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form key="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {/* Name */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>
                                        Full Name *
                                    </label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Rajesh Kumar"
                                    />
                                    {errors.name && <div style={{ color: '#FF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.name}</div>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>
                                        Email Address *
                                    </label>
                                    <input
                                        className="form-input"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && <div style={{ color: '#FF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</div>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>
                                        Mobile Number *
                                    </label>
                                    <input
                                        className="form-input"
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="10-digit mobile number"
                                        maxLength={10}
                                    />
                                    {errors.phone && <div style={{ color: '#FF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.phone}</div>}
                                </div>

                                {/* Purpose */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>
                                        Installation Purpose *
                                    </label>
                                    <select
                                        className="form-input"
                                        name="purpose"
                                        value={form.purpose}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select your use case</option>
                                        {purposes.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                    {errors.purpose && <div style={{ color: '#FF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.purpose}</div>}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary"
                                    style={{
                                        width: '100%', justifyContent: 'center',
                                        padding: '1rem', fontSize: '1rem', zIndex: 1,
                                        opacity: loading ? 0.7 : 1,
                                        cursor: loading ? 'wait' : 'pointer',
                                    }}
                                >
                                    {loading ? (
                                        <><span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Submitting...</>
                                    ) : (
                                        '🚀 Register My Interest'
                                    )}
                                </button>

                                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

                                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                                    🔒 Your information is secure. We never share your data.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
