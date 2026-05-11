import React from "react";
import { motion } from "framer-motion";
import "./arrows.css";

const ArrowCurve1 = ({ wobble = true }) => {
    return (
        <svg viewBox="0 0 600 200" className="arrow-svg">

            {/* 🔥 5 BIG SMOOTH CURVES (wide spacing) */}
            <motion.path
                d="
          M20 120
          C 80 120, 100 20, 200 20
          S 320 220, 400 120
          S 480 20, 560 20
        "
                className="arrow-path"
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
                    pathLength: { duration: 2.5, ease: "easeInOut" },
                    x: wobble ? { duration: 0.25, repeat: Infinity } : {},
                    y: wobble ? { duration: 0.25, repeat: Infinity } : {},
                }}
            />

            {/* 🔥 ARROW HEAD */}
            <motion.path
                d="M540 10 L560 20 L540 30"
                className="arrow-head"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 2.2 }}
            />

        </svg>
    );
};

export default ArrowCurve1;