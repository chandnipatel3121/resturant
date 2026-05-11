import React from "react";
import { motion } from "framer-motion";
import "./arrows.css";

const ArrowLoopSketch = ({ wobble = true }) => {
    return (
        <svg viewBox="0 0 320 220" className="arrow-svg">

            {/* 🔥 BIG OVAL LOOP WITH CROSS */}
            <motion.path
                d="
          M60 120
          C60 40, 260 40, 260 140
          C260 200, 120 200, 100 140
          C80 100, 120 80, 180 90
        "
                className="arrow-path rough"
                initial={{ pathLength: 0 }}
                animate={
                    wobble
                        ? {
                            pathLength: 1,
                            x: [0, 1, -1, 0],
                            y: [0, -1, 1, 0],
                        }
                        : { pathLength: 1 }
                }
                transition={{
                    pathLength: { duration: 2.2, ease: "easeInOut" },
                    x: wobble ? { duration: 0.25, repeat: Infinity } : {},
                    y: wobble ? { duration: 0.25, repeat: Infinity } : {},
                }}
            />

            {/* 🔥 ARROW HEAD (LEFT SIDE) */}
            <motion.path
                d="M65 115 L40 130 L70 140"
                className="arrow-head rough"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 1.8 }}
            />

        </svg>
    );
};

export default ArrowLoopSketch;