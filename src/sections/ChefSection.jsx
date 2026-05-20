import React, { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import videoSrc from "../assets/video.mp4"
import chef2 from "../assets/chef2.jpg"
import "../styles/sections/ChefSection.css"

const ChefSection = () => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  /* ── Animation trigger: fires after snap settles ── */
  const [isSnapped, setIsSnapped] = useState(false)

  /* ── Video autoplay ── */
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

  /* ── Animation trigger via IntersectionObserver ── */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            setIsSnapped(true)
          }
          if (!entry.isIntersecting && entry.intersectionRatio === 0) {
            setIsSnapped(false)
          }
        })
      },
      { threshold: [0, 0.45, 1] }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* ── Parallax ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const image1Y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const image2Y = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const image2YSmooth = useSpring(image2Y, { stiffness: 50, damping: 28, mass: 0.8 })

  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const bgTextY = useTransform(smoothScrollY, [0, 1], [160, -160])

  return (
    <section
      id="chef-section"
      ref={containerRef}
      className={`chef-section ${isSnapped ? "chef-snapped" : ""}`}
    >
      {/* Background Ghost Text Watermark */}
      <motion.div
        className="chef-ghost-text"
        style={{ y: bgTextY }}
        aria-hidden
      >
        anandofoods
      </motion.div>

      <div className="chef-container">
        <div className="chef-flex-container">

          {/* LEFT: TEXT */}
          <div className="chef-text-content">
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={isSnapped ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="chef-subtitle"
            >
              <span className="chef-subtitle-line" />
              The Visionary
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 55 }}
              animate={isSnapped ? { opacity: 1, y: 0 } : { opacity: 0, y: 55 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="chef-title"
            >
              The Hands<br />
              <span className="chef-title-italic">
                of anandofoods
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isSnapped ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="chef-desc"
            >
              At anandofoods, every dish begins with a vision.
              Our chef transforms simple ingredients into experiences.
              <span className="block mt-3 md:hidden text-[14px] leading-relaxed font-normal opacity-90">
                With years of culinary refinement, our kitchen crafts a dialogue between time-honored Indian recipes and contemporary plating. Every blend of spices is precise, and every texture is intentional, turning each meal into a timeless sensory memory.
              </span>
            </motion.p>
          </div>

          {/* RIGHT: IMAGES */}
          <div className="chef-image-content">
            {/* VIDEO CARD */}
            <motion.div
              initial={{ opacity: 0, x: 90, rotate: -3 }}
              animate={isSnapped
                ? { opacity: 1, x: 0, rotate: 0 }
                : { opacity: 0, x: 90, rotate: -3 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
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
              initial={{ opacity: 0, y: 90, scale: 0.88 }}
              animate={isSnapped
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 90, scale: 0.88 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                y: image2YSmooth,
                willChange: "transform",
                transform: "translateZ(0)"
              }}
              className="chef-image-card"
            >
              <div className="w-full h-full overflow-hidden">
                <img src={chef2} alt="Chef" className="chef-img-hover" />
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