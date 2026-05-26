import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import logo from "../assets/logo.png"
import styles from "../styles/components/ScrollTransition.module.css"

const ScrollTransition = () => {
  const containerRef = useRef(null)

  // Scroll progress of this in-flow banner
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Create a spring-based scroll progress for smooth scrolling physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Only show the banner "in between" sections (during scroll) and hide at resting snap points
  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0])


  // Parallax for the 2 moving lines (expanded range to fit continuous marquee)
  const x1 = useTransform(smoothProgress, [0, 1], [-180, 180])
  const x2 = useTransform(smoothProgress, [0, 1], [180, -180])

  // Logo scale and slight rotation for a dynamic feel
  const logoScale = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [0.85, 1.05, 1, 1.05, 0.85])
  const logoRotate = useTransform(smoothProgress, [0, 1], [-1.5, 1.5])

  return (
    <div ref={containerRef} className={styles.scrollTransitionWrapper}>
      <motion.div
        className={styles.overlay}
        style={{ opacity }}
      >
        {/* Unified Green Segment with Brand Background Image */}
        <div className={styles.unifiedSegment} />


        {/* 2. Central Logo Container (Centering in pure CSS, scaling/rotation on child logoCircle) */}
        <div className={styles.contentWrapper}>
          <motion.div
            className={styles.logoCircle}
            style={{ scale: logoScale, rotate: logoRotate }}
          >
            <img src={logo} alt="anandofoods" className={styles.logoImage} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default ScrollTransition
