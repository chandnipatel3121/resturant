import React from "react";
import { motion } from "framer-motion";

const ArrowLong = () => (
    <svg viewBox="0 0 300 120" className="arrow-svg">
        <motion.path
            d="M20 80 C 80 20, 200 20, 280 60"
            className="arrow-path"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
        />
        <motion.path
            d="M270 50 L280 60 L265 65"
            className="arrow-head"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.6 }}
        />
    </svg>
);

export default ArrowLong;