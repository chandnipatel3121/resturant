import React, { useRef } from "react"
import { motion } from "framer-motion"
import {
  Clock,
  Users,
  Flame,
  Plus,
  Sparkles,
} from "lucide-react"

export default function DishCard({
  dish,
  onOpenDetails,
  onAddToCart,
}) {

  const isVeg = dish.diet === "Veg";
  const dietType = dish.diet?.toLowerCase() || 'veg';
  const dietClass = dietType === 'non-veg' ? 'non-veg' : (dietType === 'vegan' || dietType === 'jain' ? 'jain' : 'veg');

  const getCardClass = () => {

    if (
      dish.course?.toLowerCase().includes("dessert")
    ) {
      return "dessert-card"
    }

    if (
      dish.course?.toLowerCase().includes("drink")
    ) {
      return "drink-card"
    }

    if (
      dish.course?.toLowerCase().includes("starter")
    ) {
      return "starter-card"
    }

    return isVeg
      ? "veg-card"
      : "nonveg-card"
  }

  // Add mouse tracking for the award-style glow effect
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="dish-card-premium"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onClick={() => onOpenDetails(dish)}
      layout
    >
      <div className="card-media">
        <motion.img src={dish.image} alt={dish.title} loading="lazy" />
        <div className="media-actions-top">
          <div className={`diet-mark ${dietClass}`} title={dish.diet}>
            <div className="diet-mark-circle"></div>
          </div>
          <div className="spice-indicator-pill">
            {[...Array(3)].map((_, i) => (
              <Flame
                key={i}
                size={12}
                fill={i < (dish.spiceLevel || 1) ? "#ff4d4d" : "none"}
                color={i < (dish.spiceLevel || 1) ? "#ff4d4d" : "rgba(0,0,0,0.1)"}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="card-content">
        <h3 className="dish-title">{dish.title}</h3>
        <div className="dish-price-clean">₹{dish.price}</div>
        <p className="dish-desc-simple">{dish.description || "Freshly prepared dish."}</p>
        <div className="availability-row">
          <button
            className="add-to-cart-simple"
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart(dish, 1)
            }}
          >
            <Plus size={18} />
            <span>Add to Order</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}