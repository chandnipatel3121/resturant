import React, { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    /* ── Lenis: used ONLY for smooth scrollTo animation ── */
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      smoothTouch: true,
      touchMultiplier: 2,
      infinite: false,
    })

    window.lenis = lenis

    /* ── IntersectionObserver: .is-visible for CSS reveal animations ── */
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible")
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll("section[id], footer").forEach((s) =>
      visibilityObserver.observe(s)
    )

    /* ─────────────────────────────────────────────────────────────
       FULLPAGE.JS-STYLE FORCED SECTION SCROLL
       ─ Outside hero: every wheel tick = one section snap
       ─ Inside hero: free Lenis scroll (300vh sticky animation)
       ─ ScrollTransition banner stays in-flow between hero & dish
    ───────────────────────────────────────────────────────────── */
    const SNAP_IDS = [
      "dish-showcase",
      "about-section",
      "chef-section",
      "cuisine-section",
      "testimonials-section",
      "contact-section",
      "main-footer",
    ]

    const SNAP_COOLDOWN = 1050  // ms between snaps
    const DELTA_THRESHOLD = 30  // px of accumulated wheel delta to trigger

    let snapInProgress = false
    let lastSnapTime = 0
    let accumulated = 0
    let touchStartY = 0

    const getElements = () =>
      SNAP_IDS.map((id) => document.getElementById(id)).filter(Boolean)

    /* True while the viewport is inside the hero's sticky scroll zone */
    const isInHero = () => {
      const hero = document.getElementById("hero-section")
      if (!hero) return false
      // Hero sticky zone ends when scrollY reaches: hero.offsetTop + hero.offsetHeight - vh
      const heroScrollEnd =
        hero.offsetTop + hero.offsetHeight - window.innerHeight
      return window.scrollY < heroScrollEnd - 40
    }

    /*
      Returns the index in SNAP_IDS of the "current" section
      (last section whose top <= +50px from viewport top).
      -1 = still in hero / before first snap section.
    */
    const getCurrentSectionIndex = () => {
      const elements = getElements()
      let idx = -1
      for (let i = 0; i < elements.length; i++) {
        const top = elements[i].getBoundingClientRect().top
        if (top <= 50) idx = i
        else break
      }
      return idx
    }

    const snapTo = (target) => {
      snapInProgress = true
      lastSnapTime = Date.now()
      accumulated = 0

      lenis.scrollTo(target, {
        duration: 1.0,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        onComplete: () => {
          snapInProgress = false
        },
      })
    }

    const triggerSnap = (direction) => {
      if (snapInProgress) return
      if (Date.now() - lastSnapTime < SNAP_COOLDOWN) return

      const hero = document.getElementById("hero-section")
      const elements = getElements()
      const currentIdx = getCurrentSectionIndex()

      if (direction > 0) {
        /* ── Scroll DOWN ── */
        const nextIdx = currentIdx + 1
        if (nextIdx < elements.length) {
          snapTo(elements[nextIdx])
        }
      } else {
        /* ── Scroll UP ── */
        if (currentIdx > 0) {
          snapTo(elements[currentIdx - 1])
        } else {
          /* Back to hero end (last sticky frame) */
          if (hero) {
            const heroEnd =
              hero.offsetTop + hero.offsetHeight - window.innerHeight
            snapTo(heroEnd)
          }
        }
      }
    }

    /* ── Wheel handler (capture phase so it runs before Lenis) ── */
    const handleWheel = (e) => {
      /* Inside hero: let Lenis scroll freely */
      if (isInHero()) return

      /* Outside hero: always block native + Lenis wheel input */
      e.preventDefault()

      if (snapInProgress) return
      if (Date.now() - lastSnapTime < SNAP_COOLDOWN) return

      /* Accumulate delta (handles high-resolution trackpads) */
      accumulated += e.deltaY

      if (Math.abs(accumulated) >= DELTA_THRESHOLD) {
        const direction = accumulated > 0 ? 1 : -1
        accumulated = 0
        triggerSnap(direction)
      }
    }

    /* ── Touch handlers ── */
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isInHero()) return
      if (snapInProgress) return
      if (Date.now() - lastSnapTime < SNAP_COOLDOWN) return

      const delta = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(delta) < 25) return

      triggerSnap(delta > 0 ? 1 : -1)
    }

    /* Use capture:true so our handler fires BEFORE Lenis processes the event */
    window.addEventListener("wheel", handleWheel, { capture: true, passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    /* ── RAF loop ── */
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      visibilityObserver.disconnect()
      lenis.destroy()
      window.lenis = null
      window.removeEventListener("wheel", handleWheel, { capture: true })
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
