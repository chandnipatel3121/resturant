import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useNav } from "../utils/NavContext";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import "../styles/pages/ContactPage.css";

// Reusable magnetic button component for Awwwards-style interaction
const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull distance
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.button>
  );
};

const ContactPage = () => {
  const { setNavTheme } = useNav();
  
  // Enforce green/dark text theme for the light navbar on mount
  useEffect(() => {
    setNavTheme('yellow');
  }, [setNavTheme]);

  const { scrollYProgress } = useScroll();
  const yMap = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <div className="contact-page">
      {/* Background Ambience */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>

      {/* HERO SECTION */}
      <section className="contact-hero">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content-wrapper"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
        >
          <motion.div className="hero-tag" variants={itemVariants}>
            <Sparkles size={14} />
            Connect With Us
          </motion.div>

          <motion.h1 variants={itemVariants}>
            Reserve Your <br />
            <span>Perfect Evening</span>
          </motion.h1>

          <motion.p variants={itemVariants}>
            Experience modern fine dining with immersive ambience, handcrafted
            flavors, and unforgettable hospitality. We await your arrival.
          </motion.p>
        </motion.div>
      </section>

      {/* SPLIT CONTACT SECTION */}
      <section className="contact-split-container">
        
        {/* Left: Info Card */}
        <motion.div 
          className="info-glass-card"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="info-header">
            <h2>Visit Anandofoods</h2>
            <p>Our dedicated concierge team is at your disposal.</p>
          </div>

          <div className="info-details-list">
            <div className="info-item">
              <div className="icon-wrapper">
                <MapPin size={22} />
              </div>
              <div className="info-text">
                <h3>Location</h3>
                <p>123 Gastronomy Blvd</p>
                <span className="subtext">Bapa Sitaram Madhuli, Shivkrupa Nagar, Bhuj</span>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-wrapper">
                <Phone size={22} />
              </div>
              <div className="info-text">
                <h3>Reservations</h3>
                <p>+91 99982 26826</p>
                <span className="subtext">Available 11am - 11pm</span>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-wrapper">
                <Mail size={22} />
              </div>
              <div className="info-text">
                <h3>General Queries</h3>
                <p>dine@anandofoods.com</p>
                <span className="subtext">Replies within 24 hours</span>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-wrapper">
                <Clock3 size={22} />
              </div>
              <div className="info-text">
                <h3>Service Hours</h3>
                <p>Mon - Sun: 11:00 AM - 11:00 PM</p>
                <span className="subtext">Open everyday</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Reservation Form */}
        <motion.div 
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <form className="premium-form" onSubmit={(e) => e.preventDefault()}>
            
            <div className="input-row">
              <div className="input-group">
                <input type="text" id="name" required />
                <label htmlFor="name">Full Name</label>
                <div className="input-line"></div>
              </div>

              <div className="input-group">
                <input type="email" id="email" required />
                <label htmlFor="email">Email Address</label>
                <div className="input-line"></div>
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <input type="tel" id="phone" required />
                <label htmlFor="phone">Phone Number</label>
                <div className="input-line"></div>
              </div>

              <div className="input-group">
                <input type="date" id="date" required />
                <label htmlFor="date" style={{top: "-20px", fontSize: "0.75rem", color: "var(--accent)"}}>Date</label>
                <div className="input-line"></div>
              </div>
            </div>

            <div className="input-group">
              <textarea id="message" required></textarea>
              <label htmlFor="message">Special Requests / Occasion</label>
              <div className="input-line"></div>
            </div>

            <MagneticButton className="submit-btn-magnetic" onClick={() => {}}>
              <span>Request Reservation</span>
              <ArrowUpRight size={18} />
            </MagneticButton>
          </form>
        </motion.div>

      </section>

      {/* MAP SECTION */}
      <section className="premium-map-section">
        <motion.div
          className="map-aesthetic-wrapper"
          style={{ y: yMap }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <iframe
            title="Restaurant Location Map"
            src="https://maps.google.com/maps?q=London%20Eye&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            allowFullScreen
          ></iframe>
          
          <div className="map-overlay-badge">
            <MapPin size={18} color="var(--accent)" />
            <h4>Get Directions</h4>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;
