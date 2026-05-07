import React, { useRef } from "react"
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion"
import InfographicMap from "../components/InfographicMap"
import "../styles/sections/ContactSection.css"

const ContactSection = () => {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end 0.4"],
  })

  const prevProgress = useRef(0)

  // 📸 Programmatic Cinematic Snap
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const direction = v > prevProgress.current ? "down" : "up"
    const prev = prevProgress.current
    prevProgress.current = v

    // Snap down when entering from top
    if (direction === 'down' && prev < 0.15 && v >= 0.15 && window.lenis) {
      window.lenis.scrollTo("#contact-section", {
        duration: 1.5,
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      })
    }

    // Snap up when entering from bottom
    if (direction === 'up' && prev > 0.85 && v <= 0.85 && window.lenis) {
      window.lenis.scrollTo("#contact-section", {
        duration: 1.5,
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      })
    }
  })

  // Balanced "Medium" spring speed
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 32,
    restDelta: 0.001
  })

  const handleMapClick = () => {
    window.open(
      "https://www.google.com/maps?q=Shreeji+Arcade+Aeroplane+Circle+Bhuj+Gujarat",
      "_blank"
    )
  }

  return (
    <section id="contact-section" ref={containerRef} className="contact-section">

      {/* LEFT PANEL - INFOGRAPHIC MAP (2D) */}
      <div className="contact-map-panel">
        <div className="map-container-wrapper">
          <InfographicMap scrollProgress={smoothProgress} />
          <div className="map-cinematic-overlay" />
        </div>
      </div>

      {/* RIGHT PANEL - MINIMAL LUXURY UI */}
      <div className="contact-info-panel">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="contact-ui-content"
        >
          <div className="contact-header">
            <h2 className="contact-brand-title">
              Visit  <span>Restro</span>
            </h2>
          </div>

          <div className="contact-details-list">
            {/* Address */}
            <motion.div
              style={{ opacity: useTransform(smoothProgress, [0.1, 0.3], [0, 1]) }}
              className="contact-item"
            >
              <div className="contact-item-label">LOCATION</div>
              <div className="contact-item-value">
                Shreeji Arcade, Aeroplane Circle, <br />
                Bhuj, Gujarat 370001
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              style={{ opacity: useTransform(smoothProgress, [0.2, 0.4], [0, 1]) }}
              className="contact-item"
            >
              <div className="contact-item-label">RESERVATIONS</div>
              <div className="contact-item-value">
                Monday — Sunday <br />
                11:00 AM - 11:00 PM
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              style={{ opacity: useTransform(smoothProgress, [0.3, 0.5], [0, 1]) }}
              className="contact-item"
            >
              <div className="contact-item-label">GET IN TOUCH</div>
              <div className="contact-item-value">+91 98765 43210</div>
              <div className="contact-item-value">support@revatix.in</div>
            </motion.div>
          </div>

          <div className="contact-actions">
            <button onClick={handleMapClick} className="luxury-btn">
              <span className="btn-text">GET DIRECTIONS</span>
              <span className="btn-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </motion.div>
      </div>

    </section>
  )
}

export default ContactSection