import React from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"

import "../styles/pages/ContactPage.css"

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      <div className="noise"></div>

      {/* HERO SECTION */}
      <section className="contact-hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-tag">
            <Sparkles size={15} />
            Luxury Dining Experience
          </div>

          <h1>
            Reserve Your
            <span> Perfect Evening</span>
          </h1>

          <p>
            Experience modern fine dining with immersive ambience, handcrafted
            flavors, and unforgettable hospitality.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Book A Table</button>
            <button className="secondary-btn">Explore Menu</button>
          </div>
        </motion.div>

        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop"
            alt="Restaurant Interior"
          />
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Left Column: Info Panels */}
          <motion.div
            className="contact-info glass-card"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="section-title">
              <span className="eyebrow">Get In Touch</span>
              <h2>Visit Flavor Fusion</h2>
            </div>

            <div className="info-details">
              <div className="info-item">
                <MapPin className="info-icon" size={20} />
                <div>
                  <h3>Location</h3>
                  <p>123 Gastronomy Boulevard, Culinary District</p>
                </div>
              </div>

              <div className="info-item">
                <Phone className="info-icon" size={20} />
                <div>
                  <h3>Reservations</h3>
                  <p>+1 (555) 839-2019</p>
                </div>
              </div>

              <div className="info-item">
                <Mail className="info-icon" size={20} />
                <div>
                  <h3>General Queries</h3>
                  <p>dine@flavorfusion.com</p>
                </div>
              </div>

              <div className="info-item">
                <Clock3 className="info-icon" size={20} />
                <div>
                  <h3>Hours</h3>
                  <p>Tue - Sun: 5:00 PM - 11:00 PM</p>
                  <p className="subtext">Closed on Mondays</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Floating-Label Form */}
          <motion.div
            className="contact-form-wrapper glass-card"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <input type="text" id="name" required />
                <label htmlFor="name">Full Name</label>
              </div>

              <div className="input-group">
                <input type="email" id="email" required />
                <label htmlFor="email">Email Address</label>
              </div>

              <div className="input-group">
                <textarea id="message" required></textarea>
                <label htmlFor="message">Special Requests / Message</label>
              </div>

              <button type="submit" className="submit-btn">
                Send Message <ArrowUpRight size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="map-section">
        <motion.div
          className="map-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
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
        </motion.div>
      </section>
    </div>
  )
}

export default ContactPage
