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
      wheelMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    })

    window.lenis = lenis

    /* ─────────────────────────────────────────────
       IntersectionObserver: .is-visible for CSS
    ───────────────────────────────────────────── */
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible")
        })
      },
      { threshold: 0.2 }
    )
    document.querySelectorAll("section[id], footer").forEach((s) =>
      visibilityObserver.observe(s)
    )

    /* ─────────────────────────────────────────────
       DIRECTION-AWARE FORCED SNAP

       Scroll order:
         hero-section (300vh sticky)
           ↓ ends
         [ScrollTransition — height:0, just visual]
         dish-showcase   ← snap
         about-section   ← snap
         chef-section    ← snap

       When scrolling UP back into hero from dish-showcase,
       snap to the hero's last frame (end of Scene 2).
    ───────────────────────────────────────────── */
    const SNAP_IDS = [
      "dish-showcase",
      "about-section",
      "chef-section",
      "cuisine-section",
      "testimonials-section",
      "contact-section",
      "main-footer"
    ]
    const SNAP_COOLDOWN = 650
    const VEL_THRESHOLD = 0.42

    let snapInProgress = false
    let lastSnapTime = 0
    let scrollDir = 1       // +1 down, -1 up
    let lastScrollY = window.scrollY
    let debounceTimer = null

    const snapTo = (target, offset = 0) => {
      snapInProgress = true
      lastSnapTime = Date.now()
      lenis.scrollTo(target, {
        duration: 0.95,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        offset,
        onComplete: () => { snapInProgress = false },
      })
    }

    const trySnap = () => {
      if (snapInProgress) return
      const now = Date.now()
      if (now - lastSnapTime < SNAP_COOLDOWN) return

      const vh = window.innerHeight

      /* ── When scrolling UP back into Hero ──
         Hero is 300vh. If hero bottom is in view and hero top
         has scrolled above the viewport, we're inside the hero.
         Snap to hero's last scroll position (end of Scene 2). */
      if (scrollDir < 0) {
        const hero = document.getElementById("hero-section")
        if (hero) {
          const rect = hero.getBoundingClientRect()
          const heroPartiallyVisible =
            rect.bottom > 0 &&
            rect.bottom < vh * 1.25 &&
            rect.top < -10
          if (heroPartiallyVisible) {
            const targetY = hero.offsetTop + hero.offsetHeight - vh
            if (Math.abs(window.scrollY - targetY) > 8) {
              snapTo(targetY)
              return
            }
          }
        }
      }

      /* ── Standard snap for dish-showcase, about, chef ── */
      for (const id of SNAP_IDS) {
        const el = document.getElementById(id)
        if (!el) continue

        const rect = el.getBoundingClientRect()
        const top = rect.top
        const bottom = rect.bottom

        // Eager snap ranges covering the entire viewport range to eliminate dead zones
        const snapDown = scrollDir >= 0 && top > 3 && top < vh * 0.95
        const snapUp = scrollDir < 0 && top > vh * -0.95 && top < -3 && bottom > 0

        if (snapDown || snapUp) {
          snapTo(el)
          break
        }
      }
    }

    lenis.on("scroll", ({ velocity }) => {
      if (snapInProgress) return

      // Track direction
      const currentY = window.scrollY
      if (currentY !== lastScrollY) {
        scrollDir = currentY > lastScrollY ? 1 : -1
        lastScrollY = currentY
      }

      if (debounceTimer) clearTimeout(debounceTimer)
      if (Math.abs(velocity) < VEL_THRESHOLD) {
        debounceTimer = setTimeout(trySnap, 90)
      }
    })

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
      if (debounceTimer) clearTimeout(debounceTimer)
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
