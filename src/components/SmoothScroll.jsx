import React, { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    })

    window.lenis = lenis

    let isSnapping = false
    let snapTimeout = null

    // 🎯 Intersection Observer for Section Visibility & Animations
    const observerOptions = {
      threshold: 0.2, // Trigger when 20% of section is visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
        } else {
          // Keep it simple - add class once and keep it, or remove to re-animate
          // entry.target.classList.remove("is-visible")
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll("section[id], footer")
    sections.forEach((s) => observer.observe(s))

    // 🧲 Magnetic Snapping Logic
    const handleSnap = () => {
      if (isSnapping) return

      const scrollPos = window.scrollY
      const viewportHeight = window.innerHeight
      let nearestSection = null
      let minDistance = Infinity

      sections.forEach((section) => {
        const distance = Math.abs(scrollPos - section.offsetTop)
        // Snap if we're within 15% of a section start
        if (distance < viewportHeight * 0.15 && distance < minDistance) {
          minDistance = distance
          nearestSection = section
        }
      })

      if (nearestSection && minDistance > 5) {
        isSnapping = true
        lenis.scrollTo(nearestSection, {
          duration: 0.8,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          onComplete: () => {
            isSnapping = false
          },
        })
      }
    }

    lenis.on("scroll", ({ velocity }) => {
      if (isSnapping) return

      if (snapTimeout) clearTimeout(snapTimeout)

      // When scroll slows down significantly, check for snap
      if (Math.abs(velocity) < 0.5) {
        snapTimeout = setTimeout(handleSnap, 400)
      }
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      observer.disconnect()
      lenis.destroy()
      window.lenis = null
      if (snapTimeout) clearTimeout(snapTimeout)
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
