import React, { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches

    const lenis = new Lenis({
      duration: 1.1,
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

    let isSnapping = false
    let lastWheelTime = 0
    const wheelDebounce = 600 // ms between forced scrolls

    const handleWheel = (e) => {
      if (isSnapping || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

      const now = Date.now()
      if (now - lastWheelTime < wheelDebounce) return

      const sections = Array.from(document.querySelectorAll("section[id], footer[id]"))
      if (sections.length === 0) return

      const scrollPos = window.scrollY
      const viewportHeight = window.innerHeight
      const direction = e.deltaY > 0 ? 1 : -1

      // Find current active section (the one taking up most of the view)
      let currentSectionIndex = -1
      let maxVisibleHeight = 0

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight
          currentSectionIndex = index
        }
      })

      if (currentSectionIndex === -1) return

      const currentSection = sections[currentSectionIndex]
      const rect = currentSection.getBoundingClientRect()

      // Special handling for tall sections (like Hero with parallax)
      const isTallSection = currentSection.offsetHeight > viewportHeight * 1.5

      if (isTallSection) {
        // Only snap away if we're near the edge and moving away from it
        if (direction === 1 && rect.bottom > viewportHeight + 50) {
          // Allow free scroll inside tall section
          return
        }
        if (direction === -1 && rect.top < -50) {
          // Allow free scroll inside tall section
          return
        }
      }

      // Normal Snap Logic
      const targetIndex = currentSectionIndex + direction
      if (targetIndex >= 0 && targetIndex < sections.length) {
        lastWheelTime = now
        isSnapping = true
        lenis.scrollTo(sections[targetIndex], {
          duration: 1.2,
          easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
          onComplete: () => {
            setTimeout(() => {
              isSnapping = false
            }, 100)
          },
        })
      }
    }

    // Attach wheel listener with passive: false to allow e.preventDefault if needed
    // (though Lenis handles it, we use it for our custom logic)
    window.addEventListener("wheel", handleWheel, { passive: true })

    // Also handle automatic magnetic snapping when scroll stops
    let snapTimeout = null
    lenis.on("scroll", ({ velocity }) => {
      if (isSnapping) return
      if (snapTimeout) clearTimeout(snapTimeout)

      if (Math.abs(velocity) < 0.1) {
        snapTimeout = setTimeout(() => {
          if (!isSnapping) {
            // Find nearest section start and snap to it if we're close
            const sections = document.querySelectorAll("section[id]")
            const scrollPos = window.scrollY
            let nearest = null
            let minDistance = viewportHeight * 0.3

            sections.forEach((s) => {
              const dist = Math.abs(scrollPos - s.offsetTop)
              if (dist < minDistance) {
                minDistance = dist
                nearest = s
              }
            })

            if (nearest) {
              isSnapping = true
              lenis.scrollTo(nearest, {
                duration: 0.8,
                onComplete: () => (isSnapping = false),
              })
            }
          }
        }, 400)
      }
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      lenis.destroy()
      window.lenis = null
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
