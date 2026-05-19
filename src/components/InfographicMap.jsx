import React from "react"
import { motion } from "framer-motion"
import "@fontsource/kalam" // Handwritten font
import anandoLogo from "../assets/anandofood.jpg"
import "../styles/sections/arrows.css"

const InfographicMap = () => {
  return (
    <div className="w-full h-full bg-[#FAF8F5] p-2 flex flex-col items-center justify-center overflow-hidden relative">

      {/* Subtle Texture overlay for realism */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}
      />

      <div className="relative z-10 w-full h-full p-8 md:p-14 flex items-center justify-center">



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

            {/* Realistic Car Defs */}
            <filter id="car-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
            </filter>
            <filter id="glow-white" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="-2" dy="0" stdDeviation="2" floodColor="#ff0000" floodOpacity="0.8" />
            </filter>
            <linearGradient id="car-body" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7a0101" />
              <stop offset="20%" stopColor="#d60b0b" />
              <stop offset="50%" stopColor="#ff3b3b" />
              <stop offset="80%" stopColor="#d60b0b" />
              <stop offset="100%" stopColor="#7a0101" />
            </linearGradient>
            <linearGradient id="car-glass" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d141c" />
              <stop offset="50%" stopColor="#2c3e50" />
              <stop offset="100%" stopColor="#0d141c" />
            </linearGradient>

            <g id="realistic-car-svg">
              <g filter="url(#car-shadow)" transform="translate(-50, -25)">
                {/* Wheels */}
                <rect x="15" y="0" width="20" height="10" rx="3" fill="#111" />
                <rect x="70" y="0" width="18" height="10" rx="3" fill="#111" />
                <rect x="15" y="40" width="20" height="10" rx="3" fill="#111" />
                <rect x="70" y="40" width="18" height="10" rx="3" fill="#111" />

                {/* Main Body */}
                <path d="M 95 15 C 102 15, 102 35, 95 35 C 80 40, 40 42, 20 40 C 0 40, 0 10, 20 10 C 40 8, 80 10, 95 15 Z" fill="url(#car-body)" />

                {/* Side Mirrors */}
                <path d="M 55 11 L 62 7 L 62 13 Z" fill="#b30000" />
                <path d="M 55 39 L 62 43 L 62 37 Z" fill="#b30000" />

                {/* Windshield */}
                <path d="M 68 15 Q 85 25, 68 35 L 56 38 Q 70 25, 56 12 Z" fill="url(#car-glass)" />

                {/* Back Window */}
                <path d="M 30 15 Q 15 25, 30 35 L 36 38 Q 22 25, 36 12 Z" fill="url(#car-glass)" />

                {/* Roof */}
                <path d="M 54 13 Q 66 25, 54 37 L 38 37 Q 26 25, 38 13 Z" fill="#a60000" />

                {/* Headlights */}
                <ellipse cx="94" cy="14" rx="2" ry="4" fill="#fff" filter="url(#glow-white)" />
                <ellipse cx="94" cy="36" rx="2" ry="4" fill="#fff" filter="url(#glow-white)" />

                {/* Taillights */}
                <ellipse cx="14" cy="12" rx="2" ry="5" fill="#ff0000" filter="url(#glow-red)" />
                <ellipse cx="14" cy="38" rx="2" ry="5" fill="#ff0000" filter="url(#glow-red)" />

                {/* Hood details / lines */}
                <path d="M 68 15 L 94 14 M 68 35 L 94 36" stroke="#000" strokeWidth="0.5" opacity="0.3" fill="none" />
              </g>
            </g>

            <g id="bike-svg">
              <g transform="translate(-40,-20)">
                {/* Wheels */}
                <circle cx="15" cy="30" r="10" fill="#111" />
                <circle cx="65" cy="30" r="10" fill="#111" />

                {/* Frame */}
                <path
                  d="M15 30 L35 15 L50 30 L65 30 L45 15 L35 15"
                  stroke="#111b47"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Seat */}
                <rect x="30" y="10" width="12" height="4" rx="2" fill="#E63946" />

                {/* Handle */}
                <path d="M48 12 L58 5" stroke="#111b47" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>
            <g id="auto-svg">
              <g transform="translate(-45,-25)">
                {/* Wheels */}
                <circle cx="18" cy="40" r="8" fill="#111" />
                <circle cx="68" cy="40" r="8" fill="#111" />

                {/* Body */}
                <path
                  d="M10 35 L10 18 Q10 5 25 5 L55 5 Q72 5 72 20 L72 35 Z"
                  fill="#F4C430"
                  stroke="#111b47"
                  strokeWidth="3"
                />

                {/* Roof */}
                <path
                  d="M20 5 L58 5 L50 -5 L28 -5 Z"
                  fill="#111"
                />

                {/* Window */}
                <rect x="24" y="12" width="24" height="12" rx="3" fill="#BDE0FE" />

                {/* Front */}
                <rect x="58" y="18" width="10" height="10" fill="#FFD166" />
              </g>
            </g>
          </defs>

          {/* Paths Group */}
          <g key="paths-v5">
            {/* 1. ZUDIO: Smooth Arc (Reversed) */}
            <g transform="translate(500, 500) rotate(-135)">
              <motion.path d="M 460 0 C 380 250, 240 0, 180 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 460 0 C 380 250, 240 0, 180 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
              <motion.g
                style={{
                  offsetPath: "path('M 460 0 C 380 250, 240 0, 180 0')",
                  offsetRotate: "auto"
                }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{
                  duration: 5,
                  delay: 2,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <use
                  href="#bike-svg"
                  transform="translate(-10,-10) scale(0.55)"
                />
              </motion.g>
            </g>

            {/* 2. JUBELI CIRCLE: Smooth Arc (Reversed) */}
            <g transform="translate(500, 500) rotate(-90)">
              <motion.path d="M 410 0 C 320 -250, 240 0, 180 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 410 0 C 320 -250, 240 0, 180 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
              />
              {/* Realistic SVG 3D Car moving along the path */}
              <motion.g
                style={{ offsetPath: "path('M 410 0 C 320 -250, 240 0, 180 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 4, delay: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
              >
                <use href="#realistic-car-svg" transform="scale(0.5)" />
              </motion.g>
            </g>

            {/* 3. BHANUSHALI NAGAR: Wavy Line (Reversed) */}
            <g transform="translate(500, 500) rotate(-30)">
              <motion.path d="M 390 0 C 360 -30, 380 -60, 320 0 C 250 60, 220 0, 180 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 390 0 C 360 -30, 380 -60, 320 0 C 250 60, 220 0, 180 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
              />
            </g>

            {/* 4. GK: Organic Single Loop (Reversed) */}
            <g transform="translate(500, 500) rotate(49)">
              <motion.path d="M 480 0 C 400 50, 330 -30, 280 -20 C 230 -10, 200 -70, 240 -70 C 280 -70, 280 0, 240 10 C 200 20, 200 0, 180 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 1.1, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 480 0 C 400 50, 330 -30, 280 -20 C 230 -10, 200 -70, 240 -70 C 280 -70, 280 0, 240 10 C 200 20, 200 0, 180 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 1.1, ease: "easeOut" }}
              />
              <motion.g
                style={{
                  offsetPath:
                    "path('M 480 0 C 400 50, 330 -30, 280 -20 C 230 -10, 200 -70, 240 -70 C 280 -70, 280 0, 240 10 C 200 20, 200 0, 180 0')",
                  offsetRotate: "auto",
                  transformBox: "fill-box",
                  transformOrigin: "center"
                }}
                initial={{
                  offsetDistance: "0%",
                  opacity: 0
                }}
                whileInView={{
                  offsetDistance: "100%",
                  opacity: 1
                }}
                viewport={{ once: false }}
                transition={{
                  offsetDistance: {
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    delay: 2
                  },
                  opacity: {
                    duration: 0.4
                  }
                }}
              >
                <use
                  href="#bike-svg"
                  transform="translate(-18,-18) scale(0.5)"
                />
              </motion.g>
            </g>

            {/* 5. KSKVKU: Organic Double Loop (Reversed) */}
            <g transform="translate(500, 500) rotate(132)">
              <motion.path d="M 480 0 C 420 50, 370 -20, 320 -10 C 270 0, 280 -60, 310 -60 C 340 -60, 340 0, 310 10 C 280 20, 290 -20, 240 -10 C 190 0, 200 -60, 230 -60 C 260 -60, 260 0, 230 10 C 200 20, 200 0, 180 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 1.3, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 480 0 C 420 50, 370 -20, 320 -10 C 270 0, 280 -60, 310 -60 C 340 -60, 340 0, 310 10 C 280 20, 290 -20, 240 -10 C 190 0, 200 -60, 230 -60 C 260 -60, 260 0, 230 10 C 200 20, 200 0, 180 0')", offsetRotate: "auto" }}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                whileInView={{ offsetDistance: "100%", opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, delay: 1.3, ease: "easeOut" }}
              />
            </g>

            {/* 6. Pramukh Swami: Sharp Zig-Zag (Reversed) */}
            <g transform="translate(500, 500) rotate(-173)">
              <motion.path d="M 350 0 L 230 -30 Q 200 0 180 0" fill="none" stroke="#111b47" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }} />
              <motion.polygon
                points="-12,-7 4,0 -12,7" fill="#111b47"
                style={{ offsetPath: "path('M 350 0 L 230 -30 Q 200 0 180 0')", offsetRotate: "auto" }}
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
                className="w-[260px] h-[260px] rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] flex items-center justify-center p-5 border border-[#eae6db] relative"
              >
                {/* Pulsing rings for awwwards style effect */}
                <div className="absolute inset-0 rounded-full border border-[#121a36]/10 animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                <div className="absolute -inset-4 rounded-full border border-[#121a36]/5 animate-pulse"></div>

                <img src={anandoLogo} alt="anandofoods Logo" className="w-full h-full object-contain relative z-10" />
              </motion.div>
            </div>
          </foreignObject>


          {/* Precision Text Labels matched to website brand color and reference positions */}
          <g
            fontFamily="'Kalam', cursive"
            fill="#111b47"
            className="select-none"
          >
            {/* Horizontal Distance Markers - Placed "front side" near arrows */}
            <g fontSize="22" opacity="0.9">
              <motion.text x="180" y="200" initial={{ opacity: 0 }} whileInView={{ opacity: 0.9 }} transition={{ delay: 1.6 }}>1.2 KM</motion.text>
              <motion.text x="430" y="180" initial={{ opacity: 0 }} whileInView={{ opacity: 0.9 }} transition={{ delay: 1.8 }}>0.8 KM</motion.text>
              <motion.text x="780" y="380" initial={{ opacity: 0 }} whileInView={{ opacity: 0.9 }} transition={{ delay: 2.0 }}>2.1 KM</motion.text>
              <motion.text x="780" y="830" initial={{ opacity: 0 }} whileInView={{ opacity: 0.9 }} transition={{ delay: 2.2 }}>3.5 KM</motion.text>
              <motion.text x="250" y="860" initial={{ opacity: 0 }} whileInView={{ opacity: 0.9 }} transition={{ delay: 2.4 }}>4.8 KM</motion.text>
              <motion.text x="160" y="500" initial={{ opacity: 0 }} whileInView={{ opacity: 0.9 }} transition={{ delay: 2.6 }}>1.5 KM</motion.text>
            </g>

            {/* Standard Labels */}
            <g fontSize="28">
              <motion.text x="140" y="140" transform="rotate(-15, 140, 140)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.4 }}>
                ZUDIO
              </motion.text>

              <motion.text x="500" y="40" textAnchor="middle" transform="rotate(-5, 500, 40)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.6 }}>
                JUBELI CIRCLE
              </motion.text>

              <motion.text x="880" y="270" textAnchor="middle" transform="rotate(8, 880, 270)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.8 }}>RELIENCE</motion.text>
              <motion.text x="880" y="305" textAnchor="middle" fontSize="22" transform="rotate(8, 880, 305)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.8 }}>

              </motion.text>

              <motion.text x="820" y="880" transform="rotate(-10, 850, 900)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 1.0 }}>
                COMMERS COLLAGE
              </motion.text>

              <motion.text x="140" y="900" transform="rotate(5, 140, 900)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 1.2 }}>
                MIRJAPAR
              </motion.text>

              <motion.text x="70" y="420" transform="rotate(-8, 70, 420)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 1.4 }}>HILL</motion.text>
              <motion.text x="70" y="455" fontSize="22" transform="rotate(-8, 70, 455)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 1.4 }}>
                GARDERN
              </motion.text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default InfographicMap
