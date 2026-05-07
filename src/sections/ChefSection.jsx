import React, { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import videoSrc from "../assets/video.mp4"
import chef2 from "../assets/chef2.jpg"
import "../styles/sections/ChefSection.css"

const ChefSection = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { })
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const image1Y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const image2Y = useTransform(scrollYProgress, [0, 1], [-60, 60])

  const image2YSmooth = useSpring(image2Y, {
    stiffness: 50,
    damping: 28,
    mass: 0.8
  })

  const prevV = useRef(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const direction = v > prevV.current ? 'down' : 'up'
    const prev = prevV.current
    prevV.current = v

    // Snap down when entering from top
    if (direction === 'down' && prev < 0.15 && v >= 0.15 && window.lenis) {
      window.lenis.scrollTo("#chef-section", {
        duration: 1.5,
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      })
    }

    // Snap up when entering from bottom
    if (direction === 'up' && prev > 0.85 && v <= 0.85 && window.lenis) {
      window.lenis.scrollTo("#chef-section", {
        duration: 1.5,
        easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      })
    }
  })

  return (
    <section id="chef-section" ref={containerRef} className="chef-section">
      <div className="chef-container">
        <div className="chef-flex-container">

          {/* LEFT: TEXT */}
          <div className="chef-text-content">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="chef-subtitle"
            >
              <span className="chef-subtitle-line" />
              The Visionary
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="chef-title"
            >
              The Hands<br />
              <span className="chef-title-italic">
                of Restro
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="chef-desc"
            >
              At Restro, every dish begins with a vision.
              Our chef transforms simple ingredients into experiences.
            </motion.p>
          </div>

          {/* RIGHT: IMAGES */}
          <div className="chef-image-content">
            {/* VIDEO CARD */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2 }}
              style={{ y: image1Y }}
              className="chef-video-card"
            >
              <video
                ref={videoRef}
                src={videoSrc}
                muted
                loop
                playsInline
                className="w-full h-auto block"
              />

              <div className="chef-live-tag">
                <span className="chef-live-dot" />
                <span className="chef-live-text">Live</span>
              </div>
            </motion.div>

            {/* IMAGE CARD */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.2 }}
              style={{
                y: image2YSmooth,
                willChange: "transform",
                transform: "translateZ(0)"
              }}
              className="chef-image-card"
            >
              <div className="w-full h-full overflow-hidden">
                <img
                  src={chef2}
                  alt="Chef"
                  className="chef-img-hover"
                />
              </div>
              <div className="chef-img-overlay" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChefSection