import React, { useMemo } from "react"
import { motion, useTransform } from "framer-motion"

const LowPolyMap = ({ scrollProgress }) => {
  // Low Poly Theme Colors
  const COLORS = {
    bg: "#f3f4f6",
    road: "#374151",      // Dark grey road
    grass: "#a3e635",     // Vibrant low poly green
    desert: "#fbbf24",    // Low poly orange/sand
    snow: "#f0f9ff",      // Snowy blue/white
    accent: "#ef4444",    // Red car
    building: "#ffffff"
  }

  // Winding Vertical Path (Isometric feel)
  const pathD = "M 100 700 L 250 650 L 150 550 L 400 450 L 300 350 L 500 250 L 400 150 L 550 50"
  
  const pathLength = useTransform(scrollProgress, [0, 1], [0, 1])

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#f3f4f6] flex items-center justify-center p-4">
      <svg
        viewBox="0 0 600 800"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Biomes (Low Poly Shapes) */}
        <path d="M 0 600 L 300 800 L 600 600 Z" fill={COLORS.snow} opacity="0.4" />
        <path d="M 100 400 L 400 600 L 600 400 L 300 200 Z" fill={COLORS.grass} opacity="0.3" />
        <path d="M 0 100 L 300 300 L 600 0 Z" fill={COLORS.desert} opacity="0.3" />

        {/* The Winding Road (Base) */}
        <path
          d={pathD}
          stroke={COLORS.road}
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dashed White Lines */}
        <path
          d={pathD}
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray="10 15"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />

        {/* Animated Active Progress Line (Optional, for visual feedback) */}
        <motion.path
          d={pathD}
          stroke="#60a5fa"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
          opacity="0.4"
        />

        {/* Low Poly Props (Trees/Buildings) */}
        <g transform="translate(180, 680) skewX(-15)">
          <rect width="30" height="20" fill={COLORS.building} rx="2" />
          <path d="M 0 0 L 15 -15 L 30 0 Z" fill="#ef4444" />
        </g>
        <g transform="translate(420, 420) skewX(-15)">
          <circle cx="0" cy="0" r="10" fill={COLORS.grass} />
          <rect x="-2" y="0" width="4" height="15" fill="#713f12" />
        </g>
        <g transform="translate(320, 320) skewX(-15)">
          <rect width="40" height="40" fill={COLORS.building} rx="2" />
          <rect x="5" y="5" width="30" height="10" fill="#bae6fd" />
        </g>

        {/* THE CAR (2D Animated following road) */}
        <motion.g
          style={{ 
            offsetPath: `path("${pathD}")`,
            offsetDistance: useTransform(scrollProgress, [0, 1], ["0%", "100%"]),
            offsetRotate: "auto"
          }}
        >
          {/* Car Body */}
          <rect x="-15" y="-10" width="30" height="20" rx="4" fill={COLORS.accent} />
          <rect x="2" y="-7" width="10" height="14" rx="2" fill="#ffffff" opacity="0.7" />
          {/* Headlights */}
          <circle cx="14" cy="-6" r="2" fill="white" />
          <circle cx="14" cy="6" r="2" fill="white" />
          {/* Shadow */}
          <ellipse cx="0" cy="15" rx="15" ry="5" fill="black" opacity="0.1" />
        </motion.g>

        {/* Destination Pin (Restro) */}
        <g transform="translate(550, 50)">
          <motion.g
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
          >
            <path
              d="M 0 0 C -15 -30, -15 -45, 0 -45 S 15 -30, 0 0"
              fill="#0F5C5C"
            />
            <circle cx="0" cy="-30" r="8" fill="white" />
            <text x="25" y="-25" fill="#0F5C5C" fontFamily="Playfair Display" fontWeight="bold" fontSize="24">Restro</text>
          </motion.g>
        </g>
      </svg>
    </div>
  )
}

export default LowPolyMap
