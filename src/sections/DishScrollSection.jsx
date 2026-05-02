import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import thali from "../assets/thali.jpg"
import shahipaneer from "../assets/shahipaneer.jpg"
import pavbhaji from "../assets/pavbhaji.jpg"
import dragonp from "../assets/dragonp.jpg"
import desert from "../assets/desert.jpg"
import beetroot from "../assets/beetroot.jpg"

export const DISHES = [
  { name: "Grand Thali", tagline: "A universe on one plate", img: thali },
  { name: "Shahi Paneer", tagline: "Royal indulgence, every spoonful", img: shahipaneer },
  { name: "Pav Bhaji", tagline: "Street soul, chef's touch", img: pavbhaji },
  { name: "Dragon Platter", tagline: "Fire-kissed, boldly crafted", img: dragonp },
  { name: "Chef's Special Desert", tagline: "Pure indulgence on your palate", img: desert },
  { name: "Restro Special Mix Veg", tagline: "A symphony of textures and tastes", img: beetroot },
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
                  shadow-[0_25px_70px_rgba(0,0,0,0.3)]
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
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.25)_0%,transparent_60%)]" />
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