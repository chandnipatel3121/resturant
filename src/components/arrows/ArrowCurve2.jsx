import React from "react";
import { motion } from "framer-motion";
import "./arrows.css";

const ArrowCurve2 = ({ wobble = true }) => {
    return (
        <svg viewBox="0 0 320 200" className="arrow-svg">

            <motion.path
                d="
          M20 150
          C20 30, 140 30, 140 100

          C140 170, 80 170, 80 100

          C80 30, 220 30, 220 100

          C220 170, 140 170, 140 100

          C140 30, 300 30, 310 100
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

            {/* arrow head */}
            <motion.path
                d="M295 90 L310 100 L290 110"
                className="arrow-head"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 2.2 }}
            />

        </svg>
    );
};

export default ArrowCurve2;