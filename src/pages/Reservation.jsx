import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNav } from "../utils/NavContext";
import { ArrowUpRight, Sparkles } from "lucide-react";
import "../styles/pages/Reservation.css";

const Reservation = () => {
  const { setNavTheme } = useNav();

  // Enforce green theme for the navbar on mount
  useEffect(() => {
    setNavTheme('green');
    return () => setNavTheme('light');
  }, [setNavTheme]);

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
    <div className="reservation-page">
      {/* Background Decor */}
      <div className="bg-glow res-glow-1"></div>
      <div className="bg-glow res-glow-2"></div>

      {/* Split Layout Container */}
      <div className="reservation-container">

        {/* Left Side: Ambient Image & Branding */}
        <motion.div
          className="res-ambient-side"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop"
            alt="Anando Foods Elegant Dining"
            className="res-ambient-img"
          />
          <div className="res-ambient-overlay">
            <div className="res-ambient-content">
              <Sparkles size={24} className="res-star" />
              <h2>A Symphony of <br /><span>Flavors Awaits</span></h2>
              <p>Join us for an unforgettable culinary journey at Anando Foods. Experience the legacy.</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Premium Form */}
        <motion.div
          className="res-form-side"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="res-form-scroll-area">
            <div className="res-form-header">
              <motion.div className="res-tag" variants={itemVariants}>
                ✦ SECURE YOUR TABLE
              </motion.div>
              <motion.h1 variants={itemVariants}>
                Reservation
              </motion.h1>
              <motion.p variants={itemVariants}>
                Please fill in your details to reserve a table. We will confirm your booking shortly.
              </motion.p>
            </div>

            <motion.form className="detailed-res-form" onSubmit={(e) => e.preventDefault()} variants={itemVariants}>

              {/* 1. RESERVATION DATE */}
              <div className="form-section">
                <label className="section-title">1. RESERVATION DATE</label>
                <div className="input-group-labeled">
                  <input type="date" required defaultValue="2026-05-22" />
                </div>
              </div>

              {/* 2. TIME SLOT */}
              <div className="form-section">
                <label className="section-title">2. TIME SLOT</label>
                <div className="time-slots">
                  <button type="button" className="time-slot-btn active">
                    <span className="meal">DINNER</span>
                    <span className="time">06:00 PM</span>
                  </button>
                  <button type="button" className="time-slot-btn">
                    <span className="meal">DINNER</span>
                    <span className="time">07:00 PM</span>
                  </button>
                  <button type="button" className="time-slot-btn">
                    <span className="meal">DINNER</span>
                    <span className="time">08:00 PM</span>
                  </button>
                  <button type="button" className="time-slot-btn">
                    <span className="meal">DINNER</span>
                    <span className="time">09:00 PM</span>
                  </button>
                </div>
                <div className="grace-period-warning">
                  <span className="warning-icon">⚠️</span>
                  <p><strong>Grace Period Policy:</strong> If you book for 07:00 PM, you must arrive by <strong>07:15 PM</strong>. The table will be automatically released if you are more than 15 minutes late.</p>
                </div>
              </div>

              {/* 3. NUMBER OF GUESTS */}
              <div className="form-section">
                <label className="section-title">3. NUMBER OF GUESTS</label>
                <div className="input-group-labeled">
                  <label className="sub-label">Confirmed guests</label>
                  <input type="number" min="1" required defaultValue="2" />
                </div>
              </div>

              {/* 4. AREA & UNIT SELECTION */}
              <div className="form-section">
                <label className="section-title">4. AREA & UNIT SELECTION</label>
                <div className="form-row">
                  <div className="input-group-labeled">
                    <label className="sub-label">Select area</label>
                    <select>
                      <option>AC</option>
                      <option>Non-AC</option>
                      <option>Outdoor</option>
                    </select>
                  </div>
                  <div className="input-group-labeled">
                    <label className="sub-label">Select table(s)</label>
                    <select>
                      <option>Tables: T-01</option>
                      <option>Tables: T-02</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 5. YOUR INFORMATION */}
              <div className="form-section">
                <label className="section-title">5. YOUR INFORMATION</label>
                <div className="form-row">
                  <div className="input-group-labeled">
                    <label className="sub-label">👤 Full name</label>
                    <input type="text" required placeholder="harsh" />
                  </div>
                  <div className="input-group-labeled">
                    <label className="sub-label">📞 Mobile number (Verified)</label>
                    <input type="tel" required placeholder="9879642688" />
                  </div>
                </div>
              </div>

              {/* 6. SPECIAL REQUESTS */}
              <div className="form-section">
                <label className="section-title">6. SPECIAL REQUESTS</label>
                <textarea rows="3" placeholder="e.g. Anniversary dinner, need a high chair, allergic to peanuts..."></textarea>
              </div>

              {/* 7. TERMS & CONDITIONS */}
              <div className="form-section">
                <label className="section-title">7. TERMS & CONDITIONS</label>
                <div className="terms-box">
                  <h5>Booking Policy</h5>
                  <p>Reservations are held for 15 minutes after the scheduled time. Please call ahead if you expect to be late.</p>
                  <div className="terms-divider"></div>
                  <h5>Cancellation Policy</h5>
                  <p>Cancellations must be made at least 2 hours before the reservation time. Late cancellations may attract a fee.</p>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" id="terms-agree" required />
                  <label htmlFor="terms-agree">I have read and agree to the above Terms & Conditions</label>
                </div>
              </div>

              <div className="submit-section">
                <button type="submit" className="submit-reservation-btn">
                  Submit Reservation Request
                </button>
                <p className="submit-note">☝️ Please accept the Terms & Conditions above to continue</p>
              </div>
            </motion.form>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Reservation;
