import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DISHES } from "./DishScrollSection"
import FloatingIngredients from "../components/FloatingIngredients"
import "../styles/sections/DishShowcase.css"

const DISH_THEMES = [
  { bg: "#aef3f3ff", accent: "#023636ff", light: "rgba(15,92,92,0.1)" },
  { bg: "#fff4d9ff", accent: "#023636ff", light: "rgba(224,169,75,0.1)" },
  { bg: "#ffe0e0ff", accent: "#023636ff", light: "rgba(239,68,68,0.1)" },
  { bg: "#e2f2e2ff", accent: "#023636ff", light: "rgba(16,185,129,0.1)" },
  { bg: "#f2d9f2ff", accent: "#023636ff", light: "rgba(217,70,239,0.1)" },
  { bg: "#e0f7d1ff", accent: "#023636ff", light: "rgba(132,204,22,0.1)" },
]

const DishShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slotSize, setSlotSize] = useState(520)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setSlotSize(width < 768 ? width * 0.9 : 520)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % DISHES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const currentTheme = DISH_THEMES[activeIndex]

  return (
    <section
      id="dish-showcase"
      className="relative w-full h-screen flex flex-col items-center justify-start overflow-hidden pt-20"
    >
      <FloatingIngredients activeIndex={activeIndex} bgColor={currentTheme.bg} />


      <div className="relative z-20 text-center w-full px-6">
        {/* <motion.span
          key={`label-${activeIndex}`}
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          className="text-xs md:text-sm font-bold uppercase block mt-16 pt-2"
          style={{ color: currentTheme.accent }}
        >
          Signature Selection
        </motion.span> */}

        <div className="h-[40vh] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-serif mb-2 transition-colors duration-500" style={{ color: currentTheme.accent }}>
                {DISHES[activeIndex].name}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* The Rotation Wheel at Bottom */}
      <div className="absolute bottom-[-10%] w-full h-[50vh] flex items-center justify-center">
        {DISHES.map((dish, i) => {
          let distance = i - activeIndex
          if (distance > DISHES.length / 2) distance -= DISHES.length
          if (distance < -DISHES.length / 2) distance += DISHES.length

          const isVisible = Math.abs(distance) <= 2

          return (
            <DishItem
              key={i}
              dish={dish}
              distance={distance}
              isVisible={isVisible}
              slotSize={slotSize}
              accentColor={currentTheme.accent}
              isActive={distance === 0}
              isMobile={isMobile}
            />
          )
        })}
      </div>

      {/* Vertical Navigation Buttons on the Right */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-50">
        <button
          onClick={() => setActiveIndex(prev => (prev - 1 + DISHES.length) % DISHES.length)}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-current hover:scale-110 active:scale-95 backdrop-blur-sm"
          style={{ color: currentTheme.accent }}
        >
          <svg className="w-6 h-6 rotate-90" viewBox="0 0 40 40" fill="none">
            <path d="M25 8 L13 20 L25 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="h-20 w-px bg-white/10 mx-auto" />
        <button
          onClick={() => setActiveIndex(prev => (prev + 1) % DISHES.length)}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-current hover:scale-110 active:scale-95 backdrop-blur-sm"
          style={{ color: currentTheme.accent }}
        >
          <svg className="w-6 h-6 rotate-90" viewBox="0 0 40 40" fill="none">
            <path d="M15 8 L27 20 L15 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}

const DishItem = ({ dish, distance, isVisible, slotSize, accentColor, isActive, isMobile }) => {
  // Large circle path for a smooth bottom arc
  const angle = distance * (isMobile ? 55 : 65)
  const radius = isMobile ? slotSize * 0.85 : slotSize * 1.5

  const rad = (angle - 90) * (Math.PI / 180)

  const xPos = radius * Math.cos(rad)
  const yPos = radius * Math.sin(rad) + radius * (isMobile ? 0.6 : 0.8)

  return (
    <motion.div
      className="absolute flex flex-col items-center pointer-events-none"
      initial={false}
      animate={{
        x: xPos,
        y: yPos - 50,
        scale: isActive ? (isMobile ? 1.3 : 1.5) : 0.4,
        opacity: isVisible ? (isActive ? 1 : 0.3) : 0,
        zIndex: isActive ? 50 : 20 - Math.abs(distance),
      }}
      transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
      style={{
        width: slotSize * 0.6,
      }}
    >
      {/* Plate / Image Shadow */}
      <motion.div
        animate={{
          scale: isActive ? [1, 1.05, 1] : 1,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-full"
        style={{
          width: slotSize * 0.5,
          height: slotSize * 0.5,
          transition: "border 0.5s ease"
        }}
      >
        <img
          src={dish.img}
          alt={dish.name}
          className={`w-full h-full object-cover rounded-full ${isActive ? 'brightness-[1.1] contrast-[1.05]' : 'brightness-[0.9]'}`}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  )
}

export default DishShowcase