import { uriToID } from './lib'

// TODO: sum popularities?
const filterAlbums = albums =>
  albums.filter(
    album =>
      !albums.find(
        a => a.name === album.name && a.popularity > album.popularity
      )
  )

const newestFirst = (a, b) => {
  if (a.release_date > b.release_date) {
    return -1
  }

  if (b.release_date < a.release_date) {
    return 1
  }

  return 0
}

export const fetchAlbums = async (albums, client, setItems) => {
  const details = []

  const filteredAlbums = albums
    // .filter(item => item.album_type === 'album')
    // .filter(item => item.album_group === 'album')
    // .filter(item => item.total_tracks > 2)
    .sort(newestFirst)

  console.log({ filteredAlbums })

  for (let i = 0; i < filteredAlbums.length; i += 20) {
    const ids = filteredAlbums
      .slice(i, i + 20)
      .map(item => uriToID(item.uri))
      .join(',')

    await client
      .get('/albums', {
        market: 'from_token',
        params: { ids },
      })
      .then(response => details.push(...response.data.albums))
  }

  setItems(filterAlbums(details))
}
