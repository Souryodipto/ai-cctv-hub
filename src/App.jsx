import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import EmailPopup from './components/EmailPopup';
import HeroSection from './components/HeroSection';
import ProductAnimation from './components/ProductAnimation';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Testimonials from './components/Testimonials';
import PricingSection from './components/PricingSection';
import LeadCaptureForm from './components/LeadCaptureForm';
import LiveDashboard from './components/LiveDashboard';
import './index.css';

function HomePage() {
  return (
    <>
      <HeroSection />
      <LiveDashboard />
      <ProductAnimation />
      <FeaturesSection />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <PricingSection />
      <LeadCaptureForm />
    </>
  );
}

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen" style={{ background: 'var(--bg-dark)' }}>
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        {showPopup && <EmailPopup onClose={() => setShowPopup(false)} />}
      </div>
    </Router>
  );
}

export default App;
