/**
 * Fades in elements marked with `.reveal` as they enter the viewport.
 * Elements already on screen are shown immediately, and a scroll check backs up
 * the observer, so content can never stay invisible (e.g. on short mobile viewports).
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  let observer: IntersectionObserver | null = null

  const show = (el: Element) => el.classList.add('is-visible')

  const scan = () => {
    observer?.disconnect()
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          show(entry.target)
          observer?.unobserve(entry.target)
        }
      }
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' })

    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        show(el)
      } else {
        observer!.observe(el)
      }
    })
  }

  let ticking = false
  const revealInView = () => {
    ticking = false
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        show(el)
      }
    })
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(revealInView)
    }
  }, { passive: true })

  // Touching classes before hydration finishes causes class mismatches.
  nuxtApp.hook('page:finish', () => {
    if (!nuxtApp.isHydrating) requestAnimationFrame(scan)
  })
  onNuxtReady(() => {
    requestAnimationFrame(scan)

    // Elements added later (filters, v-if swaps) were never observed by the last scan.
    let pending = false
    new MutationObserver((mutations) => {
      if (pending) return
      const added = mutations.some(m => [...m.addedNodes].some(n =>
        n instanceof Element && (n.matches('.reveal:not(.is-visible)') || n.querySelector('.reveal:not(.is-visible)'))
      ))
      if (added) {
        pending = true
        requestAnimationFrame(() => {
          pending = false
          scan()
        })
      }
    }).observe(document.body, { childList: true, subtree: true })
  })
})
