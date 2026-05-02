import React from "react"
import { motion } from "framer-motion"

const VisualGallerySection = () => {
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
      title: "Atmosphere",
    },
    {
      url: "https://images.unsplash.com/photo-1550966842-28c89c490d68?q=80&w=1200&auto=format&fit=crop",
      title: "Culinary Art",
    },
    {
      url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
      title: "Mixology",
    },
  ]

  return (
    <section className="relative bg-[#0F5C5C] py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-24"
        >
          <p className="text-editorial text-[#d4cbbe] mb-4">Visual Journey</p>
          <h2 className="text-5xl md:text-7xl text-[#F3F3F1]">Immersive Moments</h2>
        </motion.div>

        {/* Gallery Items */}
        <div className="space-y-32">
          {galleryImages.map((img, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20`}
            >
              {/* Image with Scale-in Reveal */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                className="w-full md:w-2/3 aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
              
              {/* Text Description */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
                className="w-full md:w-1/3 text-center md:text-left"
              >
                <h3 className="text-4xl text-[#F3F3F1] mb-6 italic">{img.title}</h3>
                <p className="text-[#d4cbbe]/80 leading-relaxed text-lg">
                  Every frame tells a story of passion, precision, and the pursuit of perfection in every dish we craft.
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VisualGallerySection
