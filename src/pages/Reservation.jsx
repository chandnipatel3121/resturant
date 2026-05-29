import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNav } from "../utils/NavContext";
import { Sparkles, Calendar, Users, MapPin, Clock, User, Phone, Edit3, ArrowUpRight, Globe } from "lucide-react";
import "../styles/pages/Reservation.css";

const Reservation = () => {
  const { setNavTheme } = useNav();

  // Dynamic states
  const [selectedMeal, setSelectedMeal] = useState("Dinner");
  const [selectedTime, setSelectedTime] = useState("07:00 PM");
  const [timeZoneName, setTimeZoneName] = useState("IST");

  // Enforce green theme for the navbar on mount
  useEffect(() => {
    setNavTheme('green');

    // Dynamically retrieve user's system timezone abbreviation
    try {
      const tzString = new Date().toLocaleDateString('en-US', { timeZoneName: 'short' });
      const parts = tzString.split(' ');
      const abbreviation = parts[parts.length - 1];
      if (abbreviation && abbreviation.length <= 4) {
        setTimeZoneName(abbreviation);
      } else {
        // Fallback calculation using standard resolved options
        const resolvedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (resolvedTz.includes("Calcutta") || resolvedTz.includes("Kolkata") || resolvedTz.includes("Asia/Delhi")) {
          setTimeZoneName("IST");
        } else {
          setTimeZoneName(resolvedTz.split("/").pop().replace("_", " "));
        }
      }
    } catch (e) {
      setTimeZoneName("Local Time");
    }

    return () => setNavTheme('light');
  }, [setNavTheme]);

  // Define proper timing configurations
  const mealConfigurations = {
    Breakfast: ["08:00 AM", "09:00 AM", "10:00 AM"],
    Lunch: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"],
    Dinner: ["07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"]
  };

  // Keep selectedTime valid when switching meals
  const handleMealChange = (meal) => {
    setSelectedMeal(meal);
    setSelectedTime(mealConfigurations[meal][0]);
  };

  return (
    <div className="reservation-page">
      {/* Background Decor */}
      <div className="bg-glow res-glow-1"></div>
      <div className="bg-glow res-glow-2"></div>

      {/* Premium Dashboard-Style Single Viewport Card */}
      <motion.div
        className="reservation-card-premium"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <form className="res-form-grid" onSubmit={(e) => e.preventDefault()}>

          {/* Left Panel: Gold/Dark-Green Brand Setting Panel */}
          <div className="res-left-panel">
            <div className="res-brand-crest">
              <Sparkles size={20} className="res-gold-star" />
              <h3>anandofoods</h3>
              <p className="res-journal-tag">Secure Your Table</p>
            </div>

            <div className="res-panel-sections">
              {/* Date Selection */}
              <div className="panel-field-group">
                <label className="panel-field-label">
                  <Calendar size={14} className="panel-icon" />
                  <span> Reservation Date</span>
                </label>
                <input type="date" required defaultValue="2026-05-27" className="panel-input" />
              </div>

              {/* Number of Guests */}
              <div className="panel-field-group">
                <label className="panel-field-label">
                  <Users size={14} className="panel-icon" />
                  <span> Confirmed Guests</span>
                </label>
                <input type="number" min="1" required defaultValue="2" className="panel-input" />
              </div>
            </div>

            <div className="res-left-footer">
              <p>✦ A Symphony of Flavors Awaits</p>
            </div>
          </div>

          {/* Right Panel: Detailed Time, Info, and Submit */}
          <div className="res-right-panel">
            <div className="right-panel-header">
              <h1>Reservation</h1>
              <p>We will confirm your dining request shortly.</p>
            </div>

            <div className="right-panel-content">

              {/* 4. Select Meal Type & Time Slot (Dynamic & Timezone Aware) */}
              <div className="res-section-block">
                <div className="section-title-row">
                  <label className="section-title">
                    <Clock size={15} /> <span>Select Timing</span>
                  </label>
                  <div className="timezone-badge">
                    <Globe size={11} />
                    <span>{timeZoneName}</span>
                  </div>
                </div>

                {/* Modern Meal Selector Tabs */}
                <div className="meal-tabs-container">
                  {Object.keys(mealConfigurations).map((meal) => (
                    <button
                      key={meal}
                      type="button"
                      className={`meal-tab-btn ${selectedMeal === meal ? "active" : ""}`}
                      onClick={() => handleMealChange(meal)}
                    >
                      {meal}
                    </button>
                  ))}
                </div>

                {/* Modern Time Slots Grid */}
                <div className="time-slots-modern">
                  {mealConfigurations[selectedMeal].map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`time-slot-btn-modern ${selectedTime === time ? "active" : ""}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <span className="meal">{selectedMeal}</span>
                      <span className="time">{time}</span>
                    </button>
                  ))}
                </div>

                <div className="grace-warning-modern">
                  <span className="warning-dot"></span>
                  <p><strong>Grace Policy:</strong> Booked tables are held for 15 minutes in <strong>{timeZoneName}</strong>. Delayed arrivals may release the slot.</p>
                </div>
              </div>

              {/* 5. Personal Information */}
              <div className="res-section-block">
                <label className="section-title">
                  <User size={15} /> <span> Personal Information</span>
                </label>
                <div className="info-form-row">
                  <div className="info-input-wrapper">
                    <input type="text" required placeholder="Full name" className="info-input" />
                  </div>
                  <div className="info-input-wrapper">
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      minLength={10}
                      placeholder="10-Digit Mobile Number"
                      className="info-input"
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* 6. Special Requests */}
              <div className="res-section-block">
                <label className="section-title">
                  <Edit3 size={15} /> <span>6. Special Notes</span>
                </label>
                <input type="text" placeholder="e.g. Anniversary dinner, allergics, baby chair..." className="special-input" />
              </div>

              {/* 7. Terms & Conditions & Book Button */}
              <div className="res-terms-and-submit">
                <div className="terms-checkbox-wrapper">
                  <input type="checkbox" id="terms-agree" required />
                  <label htmlFor="terms-agree">
                    I agree to the <strong>Booking & Cancellation policies</strong> of anandofoods.
                  </label>
                </div>

                <button type="submit" className="submit-res-btn-premium">
                  <span>Confirm Dining Request ({selectedTime} {timeZoneName})</span>
                  <ArrowUpRight size={18} />
                </button>
              </div>

            </div>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default Reservation;
