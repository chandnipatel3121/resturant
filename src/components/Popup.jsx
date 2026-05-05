import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/sections/Popup.css";

// Assets
import foodGif from "../assets/food.gif";

const Popup = ({ isOpen, onClose }) => {
    const [stage, setStage] = React.useState('dish'); // 'dish' | 'card'

    React.useEffect(() => {
        if (isOpen) {
            setStage('dish');
            const t1 = setTimeout(() => setStage('card'), 300); // Increased time for GIF to play
            return () => clearTimeout(t1);
        }
    }, [isOpen]);

    const containerVariants = {
        initial: { scale: 0.1, opacity: 0, y: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 120,
                duration: 0.8
            }
        },
        exit: {
            scale: 0.5,
            opacity: 0,
            y: 50,
            transition: { duration: 0.3 }
        }
    };

    const clocheVariants = {
        dish: {
            scale: 1.2,
            x: "-50%",
            y: "-50%",
            top: "50%",
            filter: "drop-shadow(0 20px 40px rgba(224, 169, 75, 0.4))"
        },
        card: {
            scale: 0.8,
            x: "-50%",
            y: "-50%",
            top: "0%",
            filter: "drop-shadow(0 10px 20px rgba(224, 169, 75, 0.2))",
            transition: { type: "spring", damping: 15, stiffness: 100 }
        }
    };

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
                        className={`popup-ad-card ${stage === 'card' ? 'stage-card-premium' : 'stage-dish'}`}
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 🍽️ The Master Dish - food.gif Animation */}
                        <motion.div
                            className="cloche-v2-container"
                            variants={clocheVariants}
                            animate={stage}
                        >
                            <img src={foodGif} alt="Food Animation" className="cloche-v2-img gif-main" />

                            {/* ♨️ Constant Steam Swirls */}
                            {stage === 'dish' && (
                                <div className="steam-v2-layer">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="steam-v2-vane"
                                            animate={{
                                                y: [0, -60],
                                                opacity: [0, 0.5, 0],
                                                scale: [1, 2],
                                                x: [0, i % 2 === 0 ? 10 : -10]
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                                delay: i * 0.7
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* 🃏 Card Content - Expands from center */}
                        <AnimatePresence>
                            {stage === 'card' && (
                                <motion.div
                                    className="card-liquid-body"
                                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <div className="card-inner-content-v2">
                                        <motion.div
                                            className="seasonal-badge"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            LIMITED EDITION
                                        </motion.div>
                                        <h2 className="transaction-title">MAY BLOSSOM FESTIVAL</h2>
                                        <div className="gold-divider" />
                                        <p className="transaction-desc">
                                            Celebrate the Spring harvest with our exclusive<br />
                                            <strong>Chef's Signature Tasting Menu</strong><br />
                                            featuring White Asparagus & Spring Truffles.
                                        </p>

                                    </div>

                                    <button className="formation-close" onClick={onClose}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Popup;