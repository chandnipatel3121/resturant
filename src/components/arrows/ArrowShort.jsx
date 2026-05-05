import React from "react";
import { motion } from "framer-motion";

const ArrowShort = () => (
    <svg viewBox="0 0 100 80" className="arrow-svg">
        <motion.path
            d="M10 40 L90 40"
            className="arrow-path"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
        />
        <motion.path
            d="M80 30 L90 40 L80 50"
            className="arrow-head"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8 }}
        />
    </svg>
);

export default ArrowShort;
