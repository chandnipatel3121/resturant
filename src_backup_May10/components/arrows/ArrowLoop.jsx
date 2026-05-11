import React from "react";
import { motion } from "framer-motion";
import "./arrows.css";

const ArrowLoop = ({ wobble = true }) => {
    return (
        <svg viewBox="0 0 800 260" className="arrow-svg">

            {/* 🔥 5 BIG LOOPS (SPACED + SMOOTH) */}
            <motion.path
                d="
          M40 180

          C40 20, 160 20, 160 120
          C160 220, 80 220, 80 120

          C80 20, 300 20, 300 120
          C300 220, 180 220, 180 120

          C180 20, 440 20, 440 120
          C440 220, 280 220, 280 120

          C280 20, 580 20, 580 120
          C580 220, 380 220, 380 120

          C380 20, 720 20, 750 120
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
                    pathLength: { duration: 3, ease: "easeInOut" },
                    x: wobble ? { duration: 0.25, repeat: Infinity } : {},
                    y: wobble ? { duration: 0.25, repeat: Infinity } : {},
                }}
            />

            {/* 🔥 ARROW HEAD */}
            <motion.path
                d="M720 110 L750 120 L710 130"
                className="arrow-head"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 2.6 }}
            />

        </svg>
    );
};

export default ArrowLoop;