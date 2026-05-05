import React from "react"
import { motion } from "framer-motion"
import routeMap from "../assets/map1.png"
import ArrowCurve1 from "./arrows/ArrowCurve1"
import ArrowCurve2 from "./arrows/ArrowCurve2"
import ArrowLong from "./arrows/ArrowLong"
import ArrowLoop from "./arrows/ArrowLoop"
import ArrowShort from "./arrows/ArrowShort"
import "../styles/sections/arrows.css"
import ArrowLoop4 from "./arrows/ArrowLoop4"
import ArrowLoopSketch from "./arrows/ArrowLoopSketch"


const InfographicMap = () => {
  return (
    <section className="infographic-map-section w-full min-height-[100vh] bg-[#fdfcf7] py-20 flex flex-col items-center">
      <div className="relative w-full max-w-[1200px] aspect-[16/10] px-4 md:px-0">
        <div className="relative w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[40px] overflow-hidden border-[12px] border-white bg-white">
          {/* 🗺️ Map Background */}
          <img
            src={routeMap}
            alt="Route Map"
            className="w-full h-full object-cover opacity-90 transition-all duration-700 hover:scale-105"
          />

          {/* 🏹 Strategic Arrow Overlays */}

          {/* Top Left Curve */}
          <div className="absolute top-[15%] left-[5%] w-[180px] h-[100px] rotate-[-10deg] opacity-80">
            <ArrowCurve1 />
          </div>
          <div className="absolute top-[25%] left-[25%] w-[180px] h-[100px]  opacity-80">
            <ArrowLoop4 />
          </div>

          {/* Main Highway Long Arrow */}
          <div className="absolute top-[40%] left-[25%] w-[350px] h-[150px] rotate-[5deg]">
            <ArrowLong />
          </div>

          {/* City Loop */}
          <div className="absolute bottom-[20%] left-[45%] w-[150px] h-[120px] rotate-[-15deg]">
            <ArrowLoop />
          </div>

          {/* Quick Turnaround */}
          <div className="absolute top-[10%] right-[30%] w-[120px] h-[80px] rotate-[35deg]">
            <ArrowShort />
          </div>

          {/* Final Approach Curve */}
          <div className="absolute bottom-[35%] right-[5%] w-[280px] h-[140px] rotate-[10deg]">
            <ArrowCurve2 />
          </div>

          {/* New Sketch Loop */}
          <div className="absolute bottom-[10%] right-[30%] w-[200px] h-[150px] rotate-[-5deg]">
            <ArrowLoopSketch />
          </div>


          {/* Aesthetic Overlays */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* 🌿 Decorative Foliage or Elements */}
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#0F5C5C]/5 rounded-full blur-3xl" />
        <div className="absolute -top-6 -right-6 w-48 h-48 bg-[#E0A94B]/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default InfographicMap