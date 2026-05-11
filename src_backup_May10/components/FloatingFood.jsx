import React, { useEffect, useState } from "react"

const FloatingFood = () => {
  const [style, setStyle] = useState({
    y: 0,
    scale: 0.8,
    rotate: 0,
    opacity: 0,
  })

  useEffect(() => {
    const handleScroll = () => {
      const about = document.getElementById("about")
      const visual = document.getElementById("visual")

      if (!about || !visual) return

      const scrollY = window.scrollY

      const aboutRect = about.getBoundingClientRect()
      const visualRect = visual.getBoundingClientRect()

      const aboutBottom = about.offsetTop + about.offsetHeight
      const visualTop = visual.offsetTop

      // 🎯 START when About ends (VISIBLE IN VIEWPORT)
      const start = aboutBottom - window.innerHeight * 0.4

      // 🎯 END when Visual enters
      const end = visualTop

      if (scrollY < start || scrollY > end) {
        setStyle((prev) => ({ ...prev, opacity: 0 }))
        return
      }

      const progress = (scrollY - start) / (end - start)

      // smooth easing
      const eased = progress * progress * (3 - 2 * progress)

      setStyle({
        top: 50, // 🔥 ALWAYS CENTER (IMPORTANT FIX)
        scale: 0.8 + eased * 0.5,
        rotate: eased * 60,
        opacity: 1,
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed top-1/2 left-1/2 z-[120] pointer-events-none"
      style={{
        transform: `
          translate(-50%, -50%)
          translateY(${style.y}px)
          perspective(1000px)
          rotateX(${style.rotate * 0.3}deg)
          rotateY(${style.rotate}deg)
          scale(${style.scale})
        `,
        opacity: style.opacity,
        transition: "all 0.25s ease-out",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
        className="w-[160px] md:w-[220px] drop-shadow-[0_60px_120px_rgba(0,0,0,0.7)]"
        alt=""
      />
    </div>
  )
}

export default FloatingFood
