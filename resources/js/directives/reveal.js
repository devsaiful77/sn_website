// v-reveal="'fade-left' | 'fade-right' | true"
// Adds the same [data-reveal] / .visible pattern used in the original static site's CSS.
export const revealDirective = {
  mounted(el, binding) {
    const variant = typeof binding.value === 'string' ? binding.value : null
    el.setAttribute('data-reveal', variant || 'up')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('visible')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    el.__revealObserver = io
  },
  unmounted(el) {
    if (el.__revealObserver) el.__revealObserver.disconnect()
  }
}
