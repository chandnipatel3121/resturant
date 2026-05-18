import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DISHES } from "./DishScrollSection"
import FloatingIngredients from "../components/FloatingIngredients"
import "../styles/sections/DishShowcase.css"

const DISH_THEMES = [
  { bg: "#c8f3f3ff", accent: "#0f5c5c", light: "rgba(15,92,92,0.1)" },
  { bg: "#fff4d9ff", accent: "#b7791f", light: "rgba(224,169,75,0.1)" },
  { bg: "#ffe0e0ff", accent: "#c53030", light: "rgba(239,68,68,0.1)" },
  { bg: "#e2f2e2ff", accent: "#047857", light: "rgba(16,185,129,0.1)" },
  { bg: "#f2d9f2ff", accent: "#9333ea", light: "rgba(217,70,239,0.1)" },
  { bg: "#e0f7d1ff", accent: "#4d7c0f", light: "rgba(132,204,22,0.1)" },
]

const DishShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slotSize, setSlotSize] = useState(520)
  const [radius, setRadius] = useState(500)
  const [isHovered, setIsHovered] = useState(false)

  const [isMobile, setIsMobile] = useState(false)
  const [isShort, setIsShort] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setIsMobile(width < 768)
      setIsShort(height < 720)

      // Responsive slot size based on both dimensions
      const size = height < 720
        ? Math.min(width * 0.15, 120)
        : width < 768 ? 160 : 380;
      setSlotSize(size)

      const r = width < 768
        ? Math.min(width * 0.3, 150)
        : height < 720 ? Math.min(width * 0.35, 350) : Math.min(width * 0.45, 550);
      setRadius(r)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % DISHES.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [isHovered])

  const currentTheme = DISH_THEMES[activeIndex]

  return (
    <section
      id="dish-showcase"
      className="dish-showcase relative w-full h-screen flex flex-col items-center justify-start overflow-hidden scroll-snap-start"
    >
      <FloatingIngredients activeIndex={activeIndex} bgColor={currentTheme.bg} isMobile={isMobile} isShort={isShort} />


      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: isShort ? 0.95 : 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 ${isShort ? 'top-[26%] md:top-[30%] md:-translate-y-[min(100px,12vh)]' : 'top-[28%] md:top-[35%] md:-translate-y-[min(150px,18vh)]'}`}
            style={{ color: currentTheme.accent }}
          >
            <h2 className="dish-name text-[clamp(2rem,6vw,5rem)] text-center transition-colors duration-500 scale-y-[1.6] md:scale-y-[2] origin-bottom max-w-[90vw] md:max-w-[60vw] leading-[1]">
              {DISHES[activeIndex].name}
            </h2>
            <div className="absolute left-1/2 -translate-x-1/2 w-[90vw] md:w-[65vw] text-center" style={{ top: "calc(100% + clamp(20px, 4vh, 60px))" }}>
              <p className="font-serif text-[15px] md:text-[18px] font-light tracking-wide leading-relaxed drop-shadow-md opacity-90">
                {DISHES[activeIndex].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>


      {/* The Rotation Wheel at Bottom */}
      <div className={`absolute ${isShort ? 'bottom-[-30%]' : 'bottom-[-28%] md:bottom-[-35%]'} w-full h-[72vh] flex items-center justify-center overflow-visible`}>
        {DISHES.map((dish, i) => {
          let distance = i - activeIndex
          if (distance > DISHES.length / 2) distance -= DISHES.length
          if (distance < -DISHES.length / 2) distance += DISHES.length

          const isVisible = isMobile ? distance === 0 : Math.abs(distance) <= 2

          return (
            <DishItem
              key={i}
              dish={dish}
              distance={distance}
              isVisible={isVisible}
              slotSize={slotSize}
              radius={radius}
              accentColor={currentTheme.accent}
              isActive={distance === 0}
              isMobile={isMobile}
              isShort={isShort}
              isHovered={isHovered && distance === 0}
              onHoverChange={setIsHovered}
            />
          )
        })}
      </div>

      {/* Vertical Navigation Buttons on the Right */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 md:gap-8 z-50">
        <button
          onClick={() => setActiveIndex(prev => (prev - 1 + DISHES.length) % DISHES.length)}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-current hover:scale-110 active:scale-95 backdrop-blur-sm"
          style={{ color: currentTheme.accent }}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 rotate-90" viewBox="0 0 40 40" fill="none">
            <path d="M25 8 L13 20 L25 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="h-10 md:h-20 w-px bg-white/10 mx-auto" />
        <button
          onClick={() => setActiveIndex(prev => (prev + 1) % DISHES.length)}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-current hover:scale-110 active:scale-95 backdrop-blur-sm"
          style={{ color: currentTheme.accent }}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 rotate-90" viewBox="0 0 40 40" fill="none">
            <path d="M15 8 L27 20 L15 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}

const DishItem = ({ dish, distance, isVisible, slotSize, radius, accentColor, isActive, isMobile, isShort, isHovered, onHoverChange }) => {
  // Large circle path for a smooth bottom arc
  const angle = distance * (isMobile ? 38 : 42)

  // Using the radius passed from parent for consistency

  const rad = (angle - 90) * (Math.PI / 180)

  const xPos = radius * Math.cos(rad)

  const yPos =
    radius * Math.sin(rad) +
    radius * 1.15
  return (
    <motion.div
      className="absolute flex flex-col items-center pointer-events-auto cursor-pointer"
      onMouseEnter={() => isActive && onHoverChange(true)}
      onMouseLeave={() => isActive && onHoverChange(false)}
      initial={false}
      animate={{
        x: xPos,
        y: yPos - (isMobile ? 110 : (isShort ? 45 : 50)),
        scale: isActive ? (isMobile ? 1.6 : (isShort ? 2.3 : 2.0)) : 0.5,
        opacity: isVisible ? (isActive ? 1 : 0.3) : 0,
        zIndex: isActive ? 50 : 20 - Math.abs(distance),
      }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: slotSize * 0.6,
      }}
    >
      {/* Plate / Image Shadow */}
      <motion.div
        animate={isActive ? {
          rotate: isHovered ? 0 : [-4, 4, -4],
          y: isHovered ? -15 : [0, -15, 0],
          scale: isHovered ? 1.03 : [1, 1.03, 1],
        } : {}}
        transition={{
          rotate: { repeat: Infinity, duration: 12, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 8, ease: "easeInOut" },
          scale: { repeat: Infinity, duration: 6, ease: "easeInOut" },
        }}
        className="relative"
        style={{
          width: slotSize * (isMobile ? 0.75 : 0.85),
          height: slotSize * (isMobile ? 0.75 : 0.85),
        }}
      >
        {/* Subtle ground shadow */}
        {isActive && <div className="dish-shadow" />}

        {/* The very slow rotation */}
        <div
          className={`w-full h-full ${isActive ? 'slow-rotate' : ''} ${isHovered ? 'paused' : ''}`}
          style={{
            filter: isActive
              ? "drop-shadow(0 40px 50px rgba(0,0,0,0.3))"
              : "drop-shadow(0 15px 25px rgba(0,0,0,0.15))"
          }}
        >
          <img
            src={dish.img}
            alt={dish.name}
            className={`w-full h-full object-contain transition-all duration-700 ${isActive
              ? "brightness-[1.15] contrast-[1.1] scale-110"
              : "brightness-[0.8] grayscale-[0.2]"
              }`}
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DishShowcase