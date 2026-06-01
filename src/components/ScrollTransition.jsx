import React from "react"
import logo from "../assets/logo.png"
import styles from "../styles/components/ScrollTransition.module.css"

const ScrollTransition = () => {
  return (
    <div className={styles.scrollTransitionWrapper}>
      <div className={styles.overlay}>
        {/* Unified Green Segment with Brand Background Image */}
        <div className={styles.unifiedSegment} />

        {/* 2. Central Logo Container (Centering in pure CSS) */}
        <div className={styles.contentWrapper}>
          <div className={styles.logoCircle}>
            <img src={logo} alt="anandofoods" className={styles.logoImage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollTransition
