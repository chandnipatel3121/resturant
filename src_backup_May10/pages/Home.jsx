import React, { useRef } from "react"
import HeroSection from "../sections/HeroSection"
import DishShowcase from "../sections/DishShowcase"
import AboutSection from "../sections/AboutSection"
import ChefSection from "../sections/ChefSection"
import TestimonialsSection from "../sections/TestimonialsSection"
import ChefMascot from "../components/ChefMascot"
import VegFloating from "../components/VegFloating"
import CuisineSection from "../sections/CuisineSection"
import ContactSection from "../sections/ContactSection"
import ScrollTransition from "../components/ScrollTransition"

const Home = () => {
  const containerRef = useRef(null)
  
  return (
    <div ref={containerRef} className="relative">
      <HeroSection />
      <DishShowcase />
      <AboutSection />
      <ChefSection />
      <CuisineSection />
      <TestimonialsSection />
      <ContactSection />
      <ChefMascot />
      <VegFloating />
    </div>
  )
}

export default Home
