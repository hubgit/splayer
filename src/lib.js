export const uriToID = uri => uri.split(':').pop()

export const dateToYear = date => date.split('-').shift()

export const scrollToTop = () =>
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })

export const buildQuery = (query, fields = []) =>
  fields
    .filter(field => query[field])
    .map(field =>
      field === 'year'
        ? `${field}:${query[field]}`
        : `${field}:"${query[field]}"`
    )
    .join(' ')

export const artistNames = artists =>
  artists.map(artist => artist.name).join(' / ')
