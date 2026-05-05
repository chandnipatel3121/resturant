import React, { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1.2,
      infinite: false,
    })

    window.lenis = lenis

    // 🎯 Snapping Logic
    let isSnapping = false
    let snapTimeout = null
    let lastScrollDirection = 0

    const handleSnap = () => {
      if (isSnapping) return

      const sections = document.querySelectorAll('section[id]')
      if (sections.length === 0) return

      const scrollPos = window.scrollY
      const viewportHeight = window.innerHeight

      // Find the currently visible section or the one we are moving towards
      let targetSection = null

      if (lastScrollDirection > 0) {
        // Scrolling Down: find the first section whose top is below the current scroll pos
        for (let section of sections) {
          if (section.offsetTop > scrollPos + 10) {
            targetSection = section
            break
          }
        }
      } else if (lastScrollDirection < 0) {
        // Scrolling Up: find the first section whose top is above the current scroll pos
        const reversedSections = Array.from(sections).reverse()
        for (let section of reversedSections) {
          if (section.offsetTop < scrollPos - 10) {
            targetSection = section
            break
          }
        }
      }

      if (targetSection) {
        isSnapping = true
        lenis.scrollTo(targetSection, {
          duration: 1.4,
          easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
          onComplete: () => {
            isSnapping = false
          }
        })
      }
    }

    lenis.on('scroll', ({ direction, velocity }) => {
      lastScrollDirection = direction

      if (snapTimeout) clearTimeout(snapTimeout)

      // If the scroll is intentional (significant velocity) or has stopped
      if (!isSnapping && Math.abs(velocity) > 0.1) {
        snapTimeout = setTimeout(handleSnap, 60) // Much faster trigger (60ms)
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
