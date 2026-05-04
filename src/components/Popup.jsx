import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/sections/Popup.css";
import cookingIsolated from "../assets/cooking_isolated.png";


const Popup = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="popup-overlay-ad"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="popup-ad-card"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ 
                            type: "spring", 
                            damping: 20, 
                            stiffness: 150 
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* ✨ Decorative Floating Elements */}
                        <motion.div
                            className="popup-particle p1"
                            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                            className="popup-particle p2"
                            animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        />
                        <motion.div
                            className="popup-particle p3"
                            animate={{ x: [0, 15, 0], opacity: [0.1, 0.4, 0.1] }}
                            transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
                        />

                        {/* ❌ Close Symbol */}
                        <button className="popup-ad-close" onClick={onClose}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="popup-ad-layout">
                            {/* 🎞️ Isolated High-End Header */}
                            <div className="popup-ad-image-isolated">
                                <motion.div
                                    className="popup-img-container"
                                    animate={{
                                        y: [0, -15, 0],
                                        rotate: [0, 2, 0]
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <img
                                        src={cookingIsolated}
                                        alt="Chef's Creation"
                                        className="popup-isolated-img"
                                    />
                                    {/* ☁️ Dynamic Shadow */}
                                    <motion.div
                                        className="popup-img-shadow"
                                        animate={{
                                            scale: [1, 0.8, 1],
                                            opacity: [0.2, 0.1, 0.2]
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>
                                <div className="popup-ad-badge">RESTRO</div>
                            </div>

                            {/* 🖋️ Ad Content Section */}
                            <div className="popup-ad-content">
                                <motion.h2
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    A Culinary <br /> Masterpiece <span className="text-accent">Awaits</span>
                                </motion.h2>

                                <motion.div
                                    className="popup-line-accent"
                                    initial={{ width: 0 }}
                                    animate={{ width: "60px" }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                />

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 1 }}
                                >
                                    Experience the intersection of art and flavor.
                                    Join us for an evening of sensory delight.
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Popup;