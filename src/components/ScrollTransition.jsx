import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import styles from "../styles/components/ScrollTransition.module.css"

const ScrollTransition = () => {
  const containerRef = useRef(null)

  // The trigger is now the container which sits in the flow
  const { scrollYProgress } = useScroll({
    target: containerRef,
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

  // Parallax for the 2 moving lines
  const x1 = useTransform(smoothProgress, [0, 1], [-80, 80])
  const x2 = useTransform(smoothProgress, [0, 1], [80, -80])

  // Logo scale and slight rotation for a dynamic feel
  const logoScale = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [0.8, 1.1, 1, 1.1, 0.8])
  const logoRotate = useTransform(smoothProgress, [0, 1], [-2, 2])

  return (
    <div ref={containerRef} className={styles.scrollTransitionWrapper}>
      <motion.div
        className={styles.overlay}
        style={{ opacity }}
      >
        {/* 1. Moving Line Top */}
        <motion.div
          className={`${styles.typoLayer} ${styles.typoLayerTop}`}
          style={{ x: x1 }}
        >
          anandofoodsanandofoodsanandofoods
        </motion.div>

        {/* 2. Central Logo Container */}
        <motion.div
          className={styles.contentWrapper}
          style={{ scale: logoScale, rotate: logoRotate }}
        >
          <div className={styles.logoBox}>
            <span className={styles.logoText}>anandofoods</span>
          </div>
        </motion.div>

        {/* 3. Moving Line Bottom */}
        <motion.div
          className={`${styles.typoLayer} ${styles.typoLayerBottom}`}
          style={{ x: x2 }}
        >
          anandofoodsanandofoodsanandofoods
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ScrollTransition
