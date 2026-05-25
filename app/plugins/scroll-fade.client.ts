const VISIBLE_CLASS = 'scroll-fade-visible'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function observeScrollFadeElements(): IntersectionObserver | null {
  if (prefersReducedMotion()) {
    document.querySelectorAll('.scroll-fade').forEach((el) => {
      el.classList.add(VISIBLE_CLASS)
    })
    return null
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const el = entry.target as HTMLElement
        el.classList.add(VISIBLE_CLASS)
        observer.unobserve(el)
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -5% 0px',
    },
  )

  document.querySelectorAll('main section:not([data-no-fade])').forEach((section, index) => {
    const el = section as HTMLElement
    if (index === 0 || el.classList.contains(VISIBLE_CLASS)) return
    if (el.querySelector('.scroll-fade-stagger')) return

    el.classList.add('scroll-fade')
    observer.observe(el)
  })

  document.querySelectorAll('[data-scroll-fade]').forEach((node) => {
    const el = node as HTMLElement
    if (el.classList.contains(VISIBLE_CLASS)) return

    const delay = el.dataset.scrollFadeDelay
    if (delay) el.style.transitionDelay = `${delay}ms`

    el.classList.add('scroll-fade')
    observer.observe(el)
  })

  document.querySelectorAll('.scroll-fade-stagger').forEach((container) => {
    container.querySelectorAll(':scope > *').forEach((child, index) => {
      const el = child as HTMLElement
      if (el.classList.contains(VISIBLE_CLASS)) return

      el.style.transitionDelay = `${index * 90}ms`
      el.classList.add('scroll-fade')
      observer.observe(el)
    })
  })

  return observer
}

export default defineNuxtPlugin((nuxtApp) => {
  let activeObserver: IntersectionObserver | null = null

  const refresh = () => {
    activeObserver?.disconnect()
    activeObserver = observeScrollFadeElements()
  }

  nuxtApp.hook('page:finish', () => {
    requestAnimationFrame(refresh)
  })

  if (import.meta.client) {
    refresh()
  }
})
