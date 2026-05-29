import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNav } from "../utils/NavContext";
import { MapPin, Phone, Mail, Clock, Leaf } from "lucide-react";
import InfographicMap from "../components/InfographicMap";
import chefImg from "../assets/chef2.jpg"; // Elegant chef image from assets
import "../styles/pages/ContactPage.css";

const ContactPage = () => {
  const { setNavTheme } = useNav();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Catering Services",
    message: ""
  });

  // Enforce green theme for the navbar on mount
  useEffect(() => {
    setNavTheme('green');
    return () => setNavTheme('light');
  }, [setNavTheme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been sent to Anando Foods. We will contact you shortly.`);
    setFormData({ name: "", phone: "", email: "", service: "Catering Services", message: "" });
  };

  // Variants for staggered entrance animation
  const pageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 16
      }
    }
  };

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="contact-page"
    >
      {/* ========================================================
          SECTION 1: HEADER BANNER BLOCK
          ======================================================== */}
      <motion.div variants={fadeInUpVariants} className="contact-section-header">
        <div className="contact-main-header">
          <h2>If You Have Any Query,<br />Please Contact Us</h2>
          <div className="contact-header-divider"></div>
        </div>
      </motion.div>

      {/* ========================================================
          SECTION 2: INTRO & CHEF DISPLAY BLOCK
          ======================================================== */}
      <motion.div
        variants={fadeInUpVariants}
        className="contact-section-intro"
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="contact-intro-container">
          {/* Text block for services/narrative */}
          <div className="contact-intro-left">
            <h3>Get an answer to your catering question</h3>
            <p>
              Anando Foods has been serving authentic coastal delicacies and premium multi-cuisine dishes for years.
              Whether it's an intimate family gathering, an anniversary, or a massive corporate catering event,
              our professional team is here to manage it with culinary perfection. Leave a message or call our support lines
              to customize your dining plans.
            </p>
          </div>

          {/* Visual block displaying elite chef portrait */}
          <div className="contact-intro-right">
            <motion.div
              className="chef-image-container"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
            >
              <img src={chefImg} alt="Anando Foods Chef" className="chef-intro-img" />
              <motion.div
                className="chef-floating-badge"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦ Top Caterer
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ========================================================
          SECTION 3: CUSTOMER FORM & CONTACT INFRASTRUCTURE GRID
          ======================================================= */}
      <div className="contact-section-grid">
        <div className="contact-grid-container">

          {/* Division A: The interactive response form */}
          <motion.div
            variants={fadeInUpVariants}
            whileHover={{ y: -4, boxShadow: "0 20px 45px rgba(15, 92, 92, 0.05)" }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            className="contact-form-card"
          >
            <h4>Leave your message</h4>
            <form onSubmit={handleSubmit} className="message-form">
              <div className="form-input-group">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="msg-input"
                />
              </div>
              <div className="form-input-group">
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="msg-input"
                />
              </div>
              <div className="form-input-group">
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="msg-input"
                />
              </div>
              <div className="form-input-group">
                <select
                  className="msg-select"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option>Catering Services</option>
                  <option>AC Area Booking</option>
                  <option>Outdoor Party Setup</option>
                  <option>General Inquiries</option>
                </select>
              </div>
              <div className="form-input-group">
                <textarea
                  required
                  placeholder="Message"
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="msg-textarea"
                ></textarea>
              </div>
              <div className="form-submit-container">
                <motion.button
                  type="submit"
                  className="msg-submit-btn"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Division B: Address, phone & digital communication channels */}
          <motion.div
            variants={fadeInUpVariants}
            whileHover={{ y: -4, boxShadow: "0 20px 45px rgba(15, 92, 92, 0.05)" }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            className="contact-details-panel"
          >
            <h4 className="details-title">Contact Information</h4>

            <div className="details-list-container">
              {/* Address card */}
              <motion.div
                className="detail-item-card"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <div className="detail-icon-circle">
                  <MapPin size={20} />
                </div>
                <div className="detail-text-block">
                  <h5>Address</h5>
                  <p>opp. Bapa Sitaram Madhuli, Shivkrupa Nagar, Bhuj, Mirjapar Part, Gujarat 370040</p>
                </div>
              </motion.div>

              {/* Phone card */}
              <motion.div
                className="detail-item-card"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <div className="detail-icon-circle">
                  <Phone size={20} />
                </div>
                <div className="detail-text-block">
                  <h5>Phone & Menu</h5>
                  <p><strong>Call:</strong> +91 99982 26826</p>
                  <p><strong>Menu:</strong> <a href="https://anandofoods.com" target="_blank" rel="noopener noreferrer" style={{ color: "#eaa43b", textDecoration: "none", fontWeight: "600" }}>anandofoods.com</a></p>
                </div>
              </motion.div>

              {/* Hours Card */}
              <motion.div
                className="detail-item-card"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <div className="detail-icon-circle">
                  <Clock size={20} />
                </div>
                <div className="detail-text-block">
                  <h5>Business Hours</h5>
                  <p>Friday – Thursday: 1:00 PM – 11:30 PM</p>
                </div>
              </motion.div>

              {/* Vegetarian friendly badge */}
              <motion.div
                className="detail-item-card"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <div className="detail-icon-circle" style={{ background: "rgba(46, 125, 50, 0.1)", color: "#2e7d32" }}>
                  <Leaf size={20} />
                </div>
                <div className="detail-text-block">
                  <h5>Service Options</h5>
                  <p style={{ color: "#2e7d32", fontWeight: "600" }}>✦ Serves delicious vegetarian dishes</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ========================================================
          SECTION 4: INTEGRATED MAP CONTAINER BLOCK
          ======================================================== */}
      <motion.div
        variants={fadeInUpVariants}
        className="contact-section-map"
      >
        <div className="map-card-aesthetic">
          <InfographicMap />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactPage;
