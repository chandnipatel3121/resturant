import React, { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // Let native CSS handle continuous touch scrolling on mobile
      touchMultiplier: 1.2,
      infinite: false,
    })

    window.lenis = lenis

    // 🎯 Magnetic Snapping Logic (Desktop Only)
    let isSnapping = false
    let snapTimeout = null
    let lastScrollDirection = 0

    const handleSnap = () => {
      // Completely disable snapping on mobile for continuous scrolling
      if (isSnapping || window.matchMedia('(max-width: 768px)').matches) return

      const sections = document.querySelectorAll('section[id]')
      if (sections.length === 0) return

      const scrollPos = window.scrollY
      const viewportHeight = window.innerHeight

      let targetSection = null
      let minDistance = Infinity

      for (let section of sections) {
        const distance = Math.abs(scrollPos - section.offsetTop)
        
        if (distance < viewportHeight * 0.4 && distance < minDistance && distance > 5) {
          minDistance = distance
          targetSection = section
        }
      }

      if (targetSection) {
        isSnapping = true
        lenis.scrollTo(targetSection, {
          duration: 1.0,
          easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
          onComplete: () => {
            isSnapping = false
          }
        })
      }
    }

    lenis.on('scroll', ({ direction, velocity }) => {
      // Do not trigger snapping on mobile
      if (window.matchMedia('(max-width: 768px)').matches) return;

      lastScrollDirection = direction

      if (snapTimeout) clearTimeout(snapTimeout)

      if (!isSnapping && Math.abs(velocity) > 0.05) {
        snapTimeout = setTimeout(handleSnap, 150)
      }
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      window.lenis = null
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
