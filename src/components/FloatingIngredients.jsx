import React, { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

import paneerCube from "../assets/ingredients/paneer_cube.png"
import coriander from "../assets/ingredients/coriander.png"
import chili from "../assets/ingredients/chili.png"
import lemon from "../assets/ingredients/lemon.png"
import strawberry from "../assets/ingredients/strawberry.png"
import bayLeaf from "../assets/ingredients/bay_leaf.png"
import carrot from "../assets/ingredients/carrot.png"
import beetroot from "../assets/ingredients/beetrooot.png"
import thali from "../assets/ingredients/thali.png"
import thali2 from "../assets/ingredients/thali2.png"
import pav from "../assets/ingredients/pav.png"
import onion from "../assets/ingredients/onion.png"
import kiwi from "../assets/ingredients/kiwi.png"

const INGREDIENT_GROUPS = {
  0: [thali, thali2, bayLeaf],      // Gujarati Thali
  1: [paneerCube, coriander],      // Shahi Paneer
  2: [pav, onion, lemon],          // Pav Bhaji
  3: [chili, lemon, coriander],    // Dragon Platter
  4: [strawberry, kiwi],           // Desert
  5: [carrot, beetroot],           // Halwa (Mix Veg)
}

const FloatingIngredients = ({ activeIndex, bgColor, isMobile }) => {
  const currentGroup = INGREDIENT_GROUPS[activeIndex] || [coriander]

  // Generate scattered positions across the whole background, avoiding the center
  const fixedItems = useMemo(() => {
    // 12 specific zones to ensure 'all side cover' without clustering
    const zones = [
      { x: [2, 12], y: [2, 15] },    // Far Top Left
      { x: [88, 98], y: [2, 15] },   // Far Top Right
      { x: [2, 12], y: [85, 98] },   // Far Bottom Left
      { x: [88, 98], y: [85, 98] },  // Far Bottom Right
      { x: [2, 10], y: [40, 60] },   // Edge Mid Left
      { x: [90, 98], y: [40, 60] },  // Edge Mid Right
      { x: [20, 40], y: [5, 20] },   // Top Left Mid
      { x: [60, 80], y: [5, 20] },   // Top Right Mid
      { x: [20, 40], y: [80, 95] },  // Bottom Left Mid
      { x: [60, 80], y: [80, 95] },  // Bottom Right Mid
      { x: [10, 30], y: [45, 65] },  // Mid Left Filling
      { x: [70, 90], y: [25, 45] },  // Mid Right Filling
      { x: [40, 60], y: [10, 25] },  // Top Center Filling
      { x: [40, 60], y: [75, 90] },  // Bottom Center Filling
      { x: [15, 35], y: [25, 45] },  // Extra Filler 1
      { x: [65, 85], y: [55, 75] },  // Extra Filler 2
    ]

    const scaleFactor = isMobile ? 0.5 : 1

    return zones.map((zone, i) => ({
      id: i,
      x: zone.x[0] + Math.random() * (zone.x[1] - zone.x[0]),
      y: zone.y[0] + Math.random() * (zone.y[1] - zone.y[0]),
      size: (150 + Math.random() * 80) * scaleFactor,
      duration: 35 + Math.random() * 25,
      delay: Math.random() * -30,
      rotate: Math.random() * 360,
      floatX: (Math.random() - 0.5) * 60,
      floatY: (Math.random() - 0.5) * 60,
      // Random starting positions for the 'fly-in' effect
      entryX: (Math.random() - 0.5) * 1000,
      entryY: (Math.random() - 0.5) * 1000,
      entryRotate: (Math.random() - 0.5) * 720,
    }))
  }, [isMobile])

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{ backgroundColor: bgColor }}
    >
      {/* ADVANCED SVG FILTER: Removes white backgrounds without black frames */}
      <svg width="0" height="0" className="absolute">
        <filter id="remove-white-clean" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1.1 -1.1 -1.1 1 1.1"
            result="mask"
          />
          <feComposite in="SourceGraphic" in2="mask" operator="in" />
        </filter>
      </svg>

      <div className="relative w-full h-full">
        {fixedItems.map((item, i) => {
          const ingredientImg = currentGroup[i % currentGroup.length]
          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: item.size,
                height: item.size,
              }}
              animate={{
                x: [0, item.floatX, 0],
                y: [0, item.floatY, 0],
                rotate: [item.rotate, item.rotate + 360],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${ingredientImg}-${item.id}`}
                  src={ingredientImg}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.3, 
                    x: item.entryX, 
                    y: item.entryY, 
                    rotate: item.entryRotate 
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: 0, 
                    y: 0, 
                    rotate: 0 
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.5, 
                    x: -item.entryX / 2, 
                    y: -item.entryY / 2, 
                    transition: { duration: 0.8 } 
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 40,
                    damping: 12,
                    mass: 1,
                    opacity: { duration: 0.6 }
                  }}
                  alt="ingredient"
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default FloatingIngredients
