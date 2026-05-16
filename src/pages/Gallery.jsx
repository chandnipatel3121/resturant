import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import "../styles/pages/Gallery.css"

// Import assets
import heroDish from "../assets/hero_dish.png"
import dining from "../assets/dining.jpg"
import chef1 from "../assets/chef1.jpg"
import chef2 from "../assets/chef2.jpg"
import dish1 from "../assets/dish1.jpg"
import beetroot from "../assets/beetroot.jpg"
import chinese from "../assets/chinese.jpg"
import desert from "../assets/desert.jpg"
import italian from "../assets/italic.jpg"
import restro1 from "../assets/resturent1.jpg"
import restro2 from "../assets/resturent2.jpg"
import restro3 from "../assets/resturent3.jpg"

// Ingredients for floating
import chili from "../assets/ingredients/chili.png"
import lemon from "../assets/ingredients/lemon.png"
import onion from "../assets/ingredients/onion.png"
import carrot from "../assets/ingredients/carrot.png"

const Gallery = () => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Parallax transforms
  const yMassive = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const yFloating1 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
  const yFloating2 = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"])
  const yFloating3 = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])

  const galleryItems = [
    { img: dining, title: "The Main Hall", category: "AMBIENCE", size: "large", loc: "FLOOR 1", time: "12:00" },
    { img: chef1, title: "Master at Work", category: "CRAFT", size: "small", loc: "KITCHEN", time: "18:30" },
    { img: restro1, title: "Outdoor Terrace", category: "SPACE", size: "medium", loc: "ROOF", time: "19:00" },
    { img: dish1, title: "Signature Pasta", category: "DISH", size: "large", loc: "STATION A", time: "20:15" },
    { img: chef2, title: "The Prep", category: "CRAFT", size: "small", loc: "KITCHEN", time: "09:00" },
    { img: restro2, title: "Wine Cellar", category: "SPACE", size: "medium", loc: "B1", time: "21:00" },
    { img: beetroot, title: "Organic Salad", category: "DISH", size: "small", loc: "COLD ST.", time: "13:20" },
    { img: chinese, title: "Wok Hei", category: "DISH", size: "large", loc: "STATION B", time: "19:45" },
    { img: desert, title: "Sweet Art", category: "DISH", size: "medium", loc: "PASTRY", time: "22:00" },
  ]

  const collections = [
    { num: "01", title: "Signature Dishes", year: "2026" },
    { num: "02", title: "Private Dining", year: "2026" },
    { num: "03", title: "Kitchen Stories", year: "2026" },
    { num: "04", title: "Seasonal Harvest", year: "2026" },
  ]

  return (
    <div className="gallery-page" ref={containerRef}>
      {/* Massive Background Text */}
      <motion.div 
        className="gallery-massive-text"
        style={{ y: yMassive }}
      >
        ANANDO GALLERY / 2026
      </motion.div>

      {/* Enhanced Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-collage">
          <motion.div className="floating-img f-1" style={{ y: yFloating1 }}>
            <img src={restro3} alt="Restaurant" />
          </motion.div>
          <motion.div className="floating-img f-2" style={{ y: yFloating2 }}>
            <img src={chef2} alt="Chef" />
          </motion.div>
          <motion.div className="floating-img f-3" style={{ y: yFloating3 }}>
            <img src={dish1} alt="Dish" />
          </motion.div>
          <motion.div className="floating-img f-4" style={{ y: yFloating1 }}>
            <img src={restro2} alt="Interior" />
          </motion.div>

          {/* Floating Ingredients */}
          <motion.img src={chili} className="floating-asset" style={{ top: "15%", left: "40%", rotate: 45, y: yFloating2 }} />
          <motion.img src={lemon} className="floating-asset" style={{ bottom: "20%", left: "25%", rotate: -20, y: yFloating3 }} />
          <motion.img src={onion} className="floating-asset" style={{ top: "60%", right: "30%", rotate: 15, y: yFloating1 }} />
        </div>

        <div className="gallery-hero-content">
          <div className="marker-tl gallery-marker">REF: GALLERY_001</div>
          <div className="marker-br gallery-marker">LAT: 23.0225° N / LONG: 72.5714° E</div>
          
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.5 }}
            className="gallery-subtitle"
          >
            AESTHETIC ARCHIVE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="gallery-title"
          >
            A MULTISENSORY <br /> COLLECTION
          </motion.h1>
          <p className="text-editorial" style={{ marginTop: "1rem", opacity: 0.6 }}>
            Capturing the essence of culinary excellence and architectural elegance.
          </p>
        </div>
      </section>

      {/* Enhanced Horizontal Slider Section */}
      <section className="gallery-slider-section">
        <div className="gallery-marker" style={{ top: "2rem", left: "var(--container-px)" }}>
          PROJECT_VIEWPORT / SCROLL TO EXPLORE
        </div>
        
        <motion.div 
          className="gallery-slider-container"
          drag="x"
          dragConstraints={{ right: 0, left: -4000 }}
          dragElastic={0.05}
        >
          {galleryItems.map((item, index) => (
            <motion.div 
              key={index}
              className={`gallery-item ${item.size}`}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
            >
              <div className="gallery-item-inner">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="gallery-item-meta">
                <span>{item.title}</span>
                <span>{item.loc} // {item.time}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Collections Index (Updated with spacing) */}
      <section className="gallery-index" style={{ marginTop: "5rem" }}>
        <div className="gallery-index-title">
          CATALOG_INDEX / 2026
        </div>
        <div className="gallery-list">
          {collections.map((item, index) => (
            <motion.a 
              href="#" 
              key={index} 
              className="gallery-list-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <span className="num">{item.num}</span>
              <span className="title">{item.title}</span>
              <span className="year">{item.year}</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Enhanced Final Call to Action */}
      <section className="gallery-footer" style={{ textAlign: "center", padding: "15rem 0", position: "relative" }}>
        <div className="gallery-marker" style={{ top: "10%", left: "50%", transform: "translateX(-50%)" }}>
          END_OF_COLLECTION
        </div>
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="gallery-title"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
        >
          STEP INTO <br /> THE FRAME
        </motion.h2>
      </section>
    </div>
  )
}

export default Gallery
