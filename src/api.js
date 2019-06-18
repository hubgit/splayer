import { uriToID } from './lib'

// TODO: sum popularities?
const filterAlbums = albums =>
  albums.filter(
    album =>
      !albums.find(
        a => a.name === album.name && a.popularity > album.popularity
      )
  )

export const fetchAlbums = async (albums, client, setItems) => {
  const details = []

  const filteredAlbums = albums.filter(item => item.album_type === 'album')

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
