import React, { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import logo from "../assets/logo.png"
import bgandado from "../assets/bgandado.png"
import styles from "../styles/components/ScrollTransition.module.css"

const ScrollTransition = () => {
  const containerRef = useRef(null)

  // The trigger is now the container which sits in the flow
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Trigger forced scroll smoothly once the divider transition has fully scrolled up and out of view (come to end)
  useEffect(() => {
    let hasSnapped = false

    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()

      // The green banner is centered at the boundary with a height of 19vh.
      // It completely exits the top of the viewport when rect.top + 9.5vh <= 0.
      const bannerLimit = -window.innerHeight * 0.095

      if (rect.top <= bannerLimit && rect.top > bannerLimit - 200) {
        if (!hasSnapped) {
          hasSnapped = true
          const target = document.getElementById("dish-showcase")
          if (target) {
            window.scrollTo({
              top: target.offsetTop,
              behavior: "smooth"
            })
          }
        }
      } else if (rect.top > window.innerHeight * 0.6) {
        // Reset snap to allow triggering again when scrolling back down
        hasSnapped = false
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Create a spring-based scroll progress for smooth scrolling physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Fade and Scale effects using the smooth progress
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

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
        {/* Unified Green Segment with Scrolling Text Marquees */}
        <div className={styles.unifiedSegment}>
          {/* Row 1 (Moving left-to-right) */}
          <motion.div
            className={styles.horizontalRow}
            style={{ x: x1 }}
          >
            {[...Array(15)].map((_, i) => (
              <span key={`r1-${i}`} className={styles.boldText}>
                anandofoods
              </span>
            ))}
          </motion.div>

          {/* Row 2 (Moving right-to-left) */}
          <motion.div
            className={styles.horizontalRow}
            style={{ x: x2 }}
          >
            {[...Array(15)].map((_, i) => (
              <span key={`r2-${i}`} className={styles.boldText}>
                anandofoods
              </span>
            ))}
          </motion.div>
        </div>

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
