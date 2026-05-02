import React from "react"
import { motion, useTransform } from "framer-motion"

const InfographicMap = ({ scrollProgress }) => {
  // Clear Professional Palette
  const COLORS = {
    bg: "#f8fafc",
    road: "#334155",      
    roadLight: "#cbd5e1",
    accent: "#E0A94B",
    pin: "#ef4444",
    park: "#dcfce7",
    building: "#f1f5f9"
  }

  // ✅ PRECISE TOPOLOGY (Traced for maximum realism)
  const pathD = "M 80 550 L 300 420 L 550 250 Q 580 230 600 300 L 620 450 L 640 550 Q 650 590 720 600"
  
  // Refined timing: Car reaches Restro precisely at the end of the scroll
  const carDistance = useTransform(scrollProgress, [0, 0.95], ["0%", "100%"])

  return (
    <div className="w-full h-full flex items-center justify-center bg-white overflow-hidden p-8 font-sans">
      <svg viewBox="0 0 900 750" className="w-full h-full max-w-6xl">
        
        {/* --- 1. CITY GRID --- */}
        <g opacity="0.1" stroke={COLORS.roadLight} strokeWidth="4" fill="none">
          <path d="M 150 0 L 150 750" />
          <path d="M 300 0 L 300 750" />
          <path d="M 0 500 L 900 500" />
          <path d="M 400 0 L 0 400" />
        </g>

        {/* --- 2. THE MAIN ROUTE --- */}
        <path d={pathD} stroke="rgba(0,0,0,0.05)" strokeWidth="52" fill="none" strokeLinecap="round" transform="translate(0, 10)" />
        <path d={pathD} stroke={COLORS.road} strokeWidth="46" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={pathD} stroke="#fff" strokeWidth="1" strokeDasharray="10 15" fill="none" opacity="0.2" />

        {/* --- 3. LANDMARKS & LABELS --- */}

        {/* START: OCYENT PIZZA */}
        <g transform="translate(60, 500)">
          <rect x="-20" y="-20" width="40" height="40" fill={COLORS.building} stroke="#cbd5e1" rx="4" />
          <text y="35" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">OCYENT PIZZA</text>
        </g>

        {/* ROAD LABEL 1: BHUJ HIGHWAY (On Road) */}
        <text transform="rotate(-30, 200, 480)" x="130" y="480" fontSize="9" fill="#94a3b8" fontWeight="900" letterSpacing="3" opacity="0.6">BHUJ HIGHWAY</text>

        {/* LANDMARK: Domino's Pizza */}
        <g transform="translate(320, 360)">
          <rect x="-15" y="-15" width="30" height="30" fill="#fee2e2" stroke="#fecaca" rx="2" />
          <text x="20" y="-15" textAnchor="start" fontSize="9" fill="#ef4444" fontWeight="bold">Domino's</text>
        </g>

        {/* JUNCTION: JUBILEE CIRCLE */}
        <g transform="translate(560, 200)">
          <circle r="40" fill="#fff" stroke="#cbd5e1" strokeWidth="1" />
          <text textAnchor="middle" y="5" fontSize="10" fontWeight="900" fill="#475569">JUBILEE CIRCLE</text>
        </g>

        {/* ROAD LABEL 2: MUNDRA ROAD (On Road) */}
        <text transform="rotate(80, 620, 380)" x="635" y="380" fontSize="9" fill="#94a3b8" fontWeight="900" letterSpacing="3" opacity="0.6">MUNDRA ROAD</text>

        {/* LANDMARK: MMPJ HOSPITAL (Pushed to OTHER SIDE - West) */}
        <g transform="translate(540, 420)">
          <rect x="-25" y="-35" width="50" height="70" fill={COLORS.building} stroke="#cbd5e1" rx="2" />
          <text x="-35" y="0" textAnchor="end" fontSize="10" fontWeight="bold" fill="#64748b">MMPJ Hospital</text>
        </g>

        {/* JUNCTION: AEROPLANE CIRCLE (AT CORNER) */}
        <g transform="translate(640, 550)">
          <circle r="22" fill="#fff" stroke="#cbd5e1" />
          <circle r="12" fill="#f1f5f9" stroke="#cbd5e1" opacity="0.5" />
          <text textAnchor="middle" y="35" fontSize="8" fontWeight="bold" fill="#94a3b8">AEROPLANE CIRCLE</text>
        </g>

        {/* DESTINATION: SHREEJI ARCADE (RESTRO) */}
        <g transform="translate(730, 620)">
          <motion.circle r="45" fill={COLORS.accent} opacity="0.1" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
          <rect x="-35" y="-20" width="70" height="40" fill="#fff" stroke={COLORS.accent} strokeWidth="2" rx="4" />
          <text textAnchor="middle" y="5" fontSize="16" fontWeight="900" fill={COLORS.accent}>RESTRO</text>
          <text y="35" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="bold">SHREEJI ARCADE</text>
          
          <motion.g animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <path d="M 0 -45 L -12 -75 A 12 12 0 1 1 12 -75 L 0 -45 Z" fill={COLORS.pin} stroke="#fff" strokeWidth="2" />
            <circle cx="0" cy="-75" r="5" fill="#fff" />
          </motion.g>
        </g>

        {/* --- 4. ANIMATED NAVIGATION VEHICLE --- */}
        <motion.g
          style={{
            offsetPath: `path("${pathD}")`,
            offsetDistance: carDistance,
            offsetRotate: "auto",
            transition: { ease: "easeInOut" }
          }}
        >
          <ellipse cx="0" cy="12" rx="16" ry="6" fill="black" opacity="0.1" />
          <rect x="-16" y="-8" width="32" height="16" rx="4" fill={COLORS.pin} />
          <rect x="6" y="-6" width="8" height="12" rx="2" fill="#fff" opacity="0.4" />
        </motion.g>

      </svg>
    </div>
  )
}

export default InfographicMap