import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import menuData from "../data/menuData"
import "../styles/sections/MenuSection.css"

const MenuSection = () => {
  const [hoveredItem, setHoveredItem] = useState(null)
  const categories = ["Starter", "Main", "Dessert"]

  return (
    <section id="menu" className="menu-section">
      <div className="menu-container">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="menu-header"
        >
          <p className="text-editorial menu-subtitle">The Collection</p>
          <h2 className="menu-title">Our Menu</h2>
        </motion.div>

        {/* Categories */}
        {categories.map((category) => (
          <div key={category} className="menu-category-group">
            <h3 className="menu-category-title">
              {category}s
            </h3>

            <div className="menu-item-list">
              {menuData
                .filter((item) => item.category === category)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="menu-item"
                  >
                    <div className="menu-item-content">
                      <div className="menu-item-header">
                        <h4 className="menu-item-title">
                          {item.title}
                        </h4>
                        <div className="menu-item-dots" />
                        <span className="menu-item-price">₹{item.price}</span>
                      </div>
                      <p className="menu-item-desc">
                        {item.description}
                      </p>
                    </div>

                    {/* Preview Image */}
                    <AnimatePresence>
                      {hoveredItem?.id === item.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, x: 20 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9, x: 20 }}
                          className="menu-item-preview"
                        >
                          <img src={item.image} alt={item.title} className="menu-preview-img" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MenuSection
