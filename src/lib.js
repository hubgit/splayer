export const uriToID = uri => uri.split(':').pop()

export const dateToYear = date => date.split('-').shift()

export const scrollToTop = () =>
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
