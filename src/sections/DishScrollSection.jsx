import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import thali from "../assets/thali.jpg"
import shahipaneer from "../assets/shahipaneer.png"
import pavbhaji from "../assets/pavbhaji.png"
import dragonp from "../assets/dragonp.jpg"
import desert from "../assets/desert.jpg"
import beetroot from "../assets/beetroot.jpg"

export const DISHES = [
  { name: "Grand Thali", tagline: "A universe on one plate", description: "Indulge in the exquisite delight of our Grand Thali. Picture a golden platter, cradling a symphony of vibrant, authentic curries, glistening under the warm lights. As you take your first bite, your taste buds awaken to a burst of rich and traditional bliss, as the spices release their natural ambrosia.", img: thali },
  { name: "Shahi Paneer", tagline: "Royal indulgence, every spoonful", description: "Experience the royal heritage of our signature Shahi Paneer. Soft, melt-in-the-mouth cottage cheese cubes simmered gracefully in a rich, creamy tomato and cashew gravy, delicately infused with aromatic Indian spices to create a truly majestic culinary journey.", img: shahipaneer },
  { name: "Pav Bhaji", tagline: "Street soul, chef's touch", description: "Savor the vibrant streets of Mumbai with our elevated Pav Bhaji. A masterful blend of fresh, buttery mashed vegetables slow-cooked to perfection with signature spices, served alongside warm, butter-toasted artisan bread that melts seamlessly on your palate.", img: pavbhaji },
  { name: "Dragon Platter", tagline: "Fire-kissed, boldly crafted", description: "Awaken your senses with the bold, fiery zest of our Dragon Platter. An exotic assortment of perfectly wok-tossed delights, coated in our secret tangy glaze and garnished with fresh scallions, delivering an unforgettable crunch and a burst of umami in every single bite.", img: dragonp },
  { name: "Chef's Special Desert", tagline: "Pure indulgence on your palate", description: "Conclude your dining experience with our Chef's Special Dessert. A delicate symphony of velvety textures and sweet nuances, meticulously crafted to balance richness and lightness, ensuring a divine finale that lingers gracefully long after the last spoonful.", img: desert },
  { name: "Mix Fruit Halwa", tagline: "A symphony of textures and tastes", description: "Immerse yourself in the comforting warmth of our Mix Fruit Halwa. A rich, buttery confection crafted from the finest seasonal fruits, slow-roasted to a perfect golden hue and generously studded with premium roasted nuts, offering a taste of pure homemade bliss.", img: beetroot },
]

const STRIP = [...DISHES, ...DISHES, ...DISHES]

const DishScrollSection = () => {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-67.33%"])

  return (
    <section
      ref={containerRef}
      className="relative w-full -mt-[220px] pt-20 pb-[160px] overflow-hidden bg-transparent z-20 pointer-events-none"
    >
      <div className="pointer-events-auto">

        {/* LABEL */}
        <div className="flex items-center justify-center gap-5 mb-10">
          <span className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#E0A94B]/65" />
          <span className="text-2xl font-bold tracking-[0.5em] uppercase text-[#E0A94B]">
            Signature Creations
          </span>
          <span className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#E0A94B]/65" />
        </div>

        {/* TRACK */}
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">

          <motion.div
            className="flex items-end gap-16 will-change-transform py-10"
            style={{ x }}
          >

            {STRIP.map((dish, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[420px] flex flex-col items-center gap-6 group"
              >

                {/* DISH */}
                <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden

                  transition-all duration-500
                  group-hover:scale-[1.05]
                  group-hover:shadow-[0_35px_90px_rgba(0,0,0,0.4),0_0_30px_rgba(224,169,75,0.25)]"
                >
                  <img
                    src={dish.img}
                    alt={dish.name}
                    draggable={false}
                    className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-[1.12]"
                  />

                  {/* shine */}
                  {/* <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.25)_0%,transparent_60%)]" /> */}
                </div>

                {/* TEXT */}
                <div className="text-center">
                  <p className="font-serif text-3xl text-white transition-colors duration-300 group-hover:text-[#E0A94B]">
                    {dish.name}
                  </p>
                  <p className="text-sm text-white/60 group-hover:text-[#E0A94B]/80">
                    {dish.tagline}
                  </p>
                </div>

              </div>
            ))}

          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DishScrollSection