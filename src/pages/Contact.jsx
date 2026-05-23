import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useNav } from "../utils/NavContext";
import InfographicMap from "../components/InfographicMap";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
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

  // Enforce green theme for the navbar on mount
  useEffect(() => {
    setNavTheme('green');
    return () => setNavTheme('light'); // reset on unmount
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

      {/* HERO & INFO SECTION */}
      <section className="contact-hero-info-section">
        <div className="contact-hero-info-container">
          {/* LEFT: HERO */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hero-content-wrapper"
          >
            <motion.div className="hero-tag" variants={itemVariants}>
              <Sparkles size={14} />
              Connect With Us
            </motion.div>

            <motion.h1 variants={itemVariants}>
              Get In <br />
              <span>Touch</span>
            </motion.h1>

            <motion.p variants={itemVariants}>
              Our dedicated concierge team is at your disposal. We're here to help you curate the perfect dining experience.
            </motion.p>
          </motion.div>

          {/* RIGHT: INFO GRID */}
          <motion.div
            className="contact-info-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="info-card-premium" variants={itemVariants} whileHover={{ y: -5 }}>
              <div className="icon-wrapper"><MapPin size={28} /></div>
              <h3>Location</h3>
              <p></p>
              <span className="subtext">Bapa Sitaram Madhuli, Shivkrupa Nagar, Bhuj, Mirjapar Part, Gujarat 370040</span>
            </motion.div>

            <motion.div className="info-card-premium" variants={itemVariants} whileHover={{ y: -5 }}>
              <div className="icon-wrapper"><Phone size={28} /></div>
              <h3>Reservations</h3>
              <p>+91 99982 26826</p>
              <span className="subtext">Available 11am - 11pm</span>
            </motion.div>

            <motion.div className="info-card-premium" variants={itemVariants} whileHover={{ y: -5 }}>
              <div className="icon-wrapper"><Mail size={28} /></div>
              <h3>General Queries</h3>
              <p>dine@anandofoods.com</p>
              <span className="subtext">Replies within 24 hours</span>
            </motion.div>

            <motion.div className="info-card-premium" variants={itemVariants} whileHover={{ y: -5 }}>
              <div className="icon-wrapper"><Clock3 size={28} /></div>
              <h3>Service Hours</h3>
              <p>Mon - Sun: 1:00 PM - 11:00 PM</p>
              <span className="subtext">Open everyday</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* INFOGRAPHIC MAP SECTION */}
      <section className="snapchat-map-section">
        <motion.div className="map-aesthetic-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="infographic-map-wrapper">
            <InfographicMap scrollProgress={yMap} />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;
