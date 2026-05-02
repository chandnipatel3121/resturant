import React, { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion"
import img1 from "../assets/dining.jpg"
import img2 from "../assets/dish1.jpg"
import "../styles/sections/AboutSection.css"

/* ── char-by-char reveal ── */
const SplitReveal = ({ text, className, delay = 0 }) => (
  <motion.span
    className={`inline-block overflow-hidden ${className}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, margin: "-80px" }}
  >
    {text.split("").map((ch, i) => (
      <motion.span
        key={i}
        className="inline-block"
        variants={{
          hidden: { y: "110%", opacity: 0 },
          visible: {
            y: 0, opacity: 1,
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.025 },
          },
        }}
      >
        {ch === " " ? "\u00A0" : ch}
      </motion.span>
    ))}
  </motion.span>
)

const AboutSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  const bgTextY = useTransform(smooth, [0, 1], [160, -160])
  const img1Y = useTransform(smooth, [0, 1], ["-8%", "8%"])
  const img2Y = useTransform(smooth, [0, 1], [60, -60])
  const img2Rotate = useTransform(smooth, [0, 1], [-4, 4])
  const statsY = useTransform(smooth, [0, 1], [40, -20])

  return (
    <section ref={ref} className="about-section">
      {/* ghost text */}
      <motion.div
        style={{ y: bgTextY }}
        className="about-ghost-text"
        aria-hidden
      >
        Restro
      </motion.div>

      {/* main grid */}
      <div className="about-grid">
        <div className="about-flex-container">

          {/* ── LEFT: TEXT ── */}
          <div className="about-text-content">
            <motion.p
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="about-subtitle"
            >
              <span className="about-subtitle-line" />
              Our Story
            </motion.p>

            <h2 className="about-title">
              <span className="block">
                <SplitReveal text="The Essence" className="text-[#0F5C5C]" delay={0} />
              </span>
              <span className="block mt-1">
                <SplitReveal text="of Restro" className="italic text-[#E0A94B] font-light" delay={0.15} />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="about-desc"
            >
              Dining is more than sustenance—it is a sequence of moments.
              Every ingredient, every texture, every presentation is crafted
              to awaken emotion and memory.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: false }} transition={{ duration: 0.7, delay: 0.4 }}
              className="about-cta"
            >
              <span className="about-cta-text">
                Discover Our Ethos
                <span className="about-cta-line" />
              </span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                →
              </motion.span>
            </motion.button>

            <motion.div style={{ y: statsY }} className="hidden lg:flex gap-10 mt-4 pt-10 border-t border-[#0F5C5C]/10" />
          </div>

          {/* ── RIGHT: IMAGE COLLAGE ── */}
          <div className="about-image-collage">
            {/* MAIN IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              className="about-img-main group"
            >
              <motion.img
                style={{ y: img1Y, scale: 1.12 }}
                src={img1}
                alt="Dining experience"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#0F5C5C]/0 group-hover:bg-[#0F5C5C]/20 transition-all duration-700" />
            </motion.div>

            {/* FLOATING SMALL IMAGE */}
            <motion.div
              style={{ y: img2Y, rotate: img2Rotate }}
              initial={{ opacity: 0, x: -40, y: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="about-img-secondary"
            >
              <img
                src={img2}
                alt="Signature dish"
                className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700"
              />
            </motion.div>

            {/* decorative rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="about-deco-ring"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection