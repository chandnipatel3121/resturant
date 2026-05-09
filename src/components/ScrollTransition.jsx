import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import "../styles/components/ScrollTransition.css"

const ScrollTransition = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Create a smooth spring-based scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Fade and Scale effects using the smooth progress
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  
  // Wider parallax for the 2 moving lines
  const x1 = useTransform(smoothProgress, [0, 1], ["-20%", "20%"])
  const x2 = useTransform(smoothProgress, [0, 1], ["20%", "-20%"])

  // Logo scale and slight rotation for a dynamic feel
  const logoScale = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [0.8, 1.1, 1, 1.1, 0.8])
  const logoRotate = useTransform(smoothProgress, [0, 1], [-2, 2])

  return (
    <motion.div
      ref={ref}
      className="scroll-transition-overlay"
      style={{ opacity }}
    >
      {/* 1. Moving Line Top (Hero Section Area) */}
      <motion.div className="typo-layer typo-layer-top" style={{ x: x1 }}>
        ANANDO FOODS PREMIUM ANANDO FOODS PREMIUM ANANDO FOODS PREMIUM
      </motion.div>

      {/* 2. Central Logo Container */}
      <motion.div 
        className="transition-content-wrapper"
        style={{ scale: logoScale, rotate: logoRotate }}
      >
        <div className="anando-tagline">SINCE 1974</div>
        <div className="anando-logo-box">
          <span className="anando-logo-text">anando foods</span>
        </div>
        <div className="anando-tagline">DELIVERING HAPPINESS</div>
      </motion.div>

      {/* 3. Moving Line Bottom (Dish Section Area) */}
      <motion.div className="typo-layer typo-layer-bottom" style={{ x: x2 }}>
        ANANDO FOODS TRADITION ANANDO FOODS TRADITION ANANDO FOODS TRADITION
      </motion.div>
    </motion.div >
  )
}

export default ScrollTransition
