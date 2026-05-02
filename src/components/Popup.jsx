import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/sections/Popup.css";


const Popup = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="popup-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="popup-box"
                        initial={{ scale: 0.7, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <button className="popup-close-icon" onClick={onClose}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="popup-content">
                            <span className="popup-badge">Special Offer</span>
                            <h2>Welcome to Restro 🍽️</h2>
                            <p>Discover our chef's special creations and seasonal flavors. Try our special dishes today!</p>
                            <div className="popup-footer-accent" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Popup;