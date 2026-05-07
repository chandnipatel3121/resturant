import React from "react"
import { motion } from "framer-motion"
import "@fontsource/kalam" // Handwritten font
import restroLogo from "../assets/restrologo.png"
import "../styles/sections/arrows.css"

const InfographicMap = () => {
  return (
    <div className="w-full h-full bg-[#FAF8F5] p-2 flex flex-col items-center justify-center overflow-hidden relative">

      {/* Subtle Texture overlay for realism */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}
      />

      <div className="relative z-10 w-full h-full px-2 flex items-center justify-center">



        {/* Unified Precision SVG Grid */}
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full z-20"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* 1. Standard Marker Arrowhead */}
            <marker id="arrow-solid" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 2 2 L 8 5 L 2 8" fill="none" stroke="#111b47" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>

            {/* 2. Thin Sharp Arrowhead */}
            <marker id="arrow-thin" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 1 1 L 9 5 L 1 9" fill="none" stroke="#111b47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>

            {/* 3. Filled Triangle Arrowhead */}
            <marker id="arrow-filled" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#111b47" />
            </marker>

            {/* 4. Sketched Double Arrowhead */}
            <marker id="arrow-sketch" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 2 2 L 8 5 L 2 8 M 3 1 L 9 5 L 3 9" fill="none" stroke="#111b47" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>

          {/* Paths Group */}
          <g>
            {/* 1. ZUDIO: Smooth Arc (Reversed) */}
            <g transform="translate(500, 500) rotate(-135)">
              <motion.path d="M 460 0 Q 250 100 115 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 460 0 Q 250 100 115 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
            </g>

            {/* 2. JUBELI CIRCLE: Smooth Arc (Reversed) */}
            <g transform="translate(500, 500) rotate(-90)">
              <motion.path d="M 410 0 Q 250 -100 125 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 410 0 Q 250 -100 125 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
              />
            </g>

            {/* 3. BHANUSHALI NAGAR: Wavy Line (Reversed) */}
            <g transform="translate(500, 500) rotate(-30)">
              <motion.path d="M 390 0 C 360 -30, 380 -60, 320 0 C 250 60, 180 -60, 125 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 390 0 C 360 -30, 380 -60, 320 0 C 250 60, 180 -60, 125 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
              />
            </g>

            {/* 4. GK: Single Perfect Loop (Reversed) */}
            <g transform="translate(500, 500) rotate(49)">
              <motion.path d="M 480 0 L 260 0 C 210 0, 210 -50, 235 -50 C 260 -50, 260 0, 210 0 L 125 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 1.1, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 480 0 L 260 0 C 210 0, 210 -50, 235 -50 C 260 -50, 260 0, 210 0 L 125 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 1.1, ease: "easeOut" }}
              />
            </g>

            {/* 5. KSKVKU: Two Perfect Loops (Reversed) */}
            <g transform="translate(500, 500) rotate(132)">
              <motion.path d="M 480 0 L 340 0 C 290 0, 290 -50, 315 -50 C 340 -50, 340 0, 290 0 C 240 0, 240 -50, 265 -50 C 290 -50, 290 0, 240 0 L 125 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 1.3, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 480 0 L 340 0 C 290 0, 290 -50, 315 -50 C 340 -50, 340 0, 290 0 C 240 0, 240 -50, 265 -50 C 290 -50, 290 0, 240 0 L 125 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 1.3, ease: "easeOut" }}
              />
            </g>

            {/* 6. Pramukh Swami: Sharp Zig-Zag (Reversed) */}
            <g transform="translate(500, 500) rotate(-173)">
              <motion.path d="M 350 0 L 230 -30 L 125 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 350 0 L 230 -30 L 125 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
              />
            </g>
          </g>

          {/* Center SVG Logo - Scales perfectly with paths */}
          <foreignObject x="350" y="350" width="300" height="300" style={{ overflow: 'visible' }}>
            <div className="w-full h-full flex items-center justify-center relative">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                className="w-[220px] h-[220px] rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] flex items-center justify-center p-5 border border-[#eae6db] relative"
              >
                {/* Pulsing rings for awwwards style effect */}
                <div className="absolute inset-0 rounded-full border border-[#121a36]/10 animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                <div className="absolute -inset-4 rounded-full border border-[#121a36]/5 animate-pulse"></div>

                <img src={restroLogo} alt="Restaurant Logo" className="w-full h-full object-contain relative z-10" />
              </motion.div>
            </div>
          </foreignObject>

          {/* Precision Text Labels matched to website brand color and reference positions */}
          <g
            fontFamily="'Kalam', cursive"
            fontSize="28"
            fill="#111b47"
            className="select-none"
          >
            <motion.text x="140" y="140" transform="rotate(-15, 140, 140)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.4 }}>ZUDIO</motion.text>

            <motion.text x="500" y="40" textAnchor="middle" transform="rotate(-5, 500, 40)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.6 }}>JUBELI CIRCLE</motion.text>

            <motion.text x="880" y="270" textAnchor="middle" transform="rotate(8, 880, 270)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.8 }}>BHANUSHALI</motion.text>
            <motion.text x="880" y="305" textAnchor="middle" fontSize="22" transform="rotate(8, 880, 305)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.8 }}>NAGAR</motion.text>

            <motion.text x="850" y="900" transform="rotate(-10, 850, 900)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 1.0 }}>GK</motion.text>

            <motion.text x="140" y="900" transform="rotate(5, 140, 900)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 1.2 }}>KSKVKU</motion.text>

            <motion.text x="70" y="420" transform="rotate(-8, 70, 420)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} viewport={{ once: false }} transition={{ delay: 1.4 }}>Pramukh</motion.text>
            <motion.text x="70" y="455" fontSize="22" transform="rotate(-8, 70, 455)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} viewport={{ once: false }} transition={{ delay: 1.4 }}>Swami NAGAR</motion.text>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default InfographicMap
