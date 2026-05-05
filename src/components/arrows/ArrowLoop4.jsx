import React from "react";
import { motion } from "framer-motion";

const ArrowLoop4 = ({ wobble = true }) => {
    return (
        <svg
            viewBox="0 0 520 220"
            style={{ width: "300px", height: "180px", overflow: "visible" }}
        >
            {/* 🔥 Arrow Head (auto aligned) */}
            <defs>
                <marker
                    id="arrowHead"
                    viewBox="0 0 12 12"
                    refX="10"
                    refY="6"
                    markerWidth="8"
                    markerHeight="8"
                    orient="auto"
                >
                    {/* 🔥 better balanced arrow */}
                    <path
                        d="M2 2 L10 6 L2 10"
                        fill="none"
                        stroke="black"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </marker>
            </defs>
            {/* 🔥 PERFECT 4 BIG LOOPS */}
            <motion.path
                d="
          M40 140

          C40 40, 120 40, 120 100
          C120 160, 80 160, 80 100

          C80 40, 200 40, 200 100
          C200 160, 140 160, 140 100

          C140 40, 300 40, 300 100
          C300 160, 200 160, 200 100

          C200 40, 420 40, 420 100
          C420 160, 280 160, 280 100

          C280 40, 500 40, 520 100
        "
                fill="none"
                stroke="black"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                markerEnd="url(#arrowHead)"
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
        </svg>
    );
};

export default ArrowLoop4;