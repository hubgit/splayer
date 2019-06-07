import { useSpotifyClient } from '@aeaton/react-spotify'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { Player } from './Player'

const Name = styled.div`
  margin: 0 16px;
`

const buildTitle = album => {
  const artists = album.artists.map(artist => artist.name).join(', ')

  return `${artists} - ${album.name}`
}

export const AlbumPage = React.memo(({ id }) => {
  const client = useSpotifyClient()

  // TODO: add read-private-country scope and add profile.country as country param
  // const { profile } = useContext(SpotifyProfileContext)

  const [album, setAlbum] = useState()

  useEffect(() => {
    if (client) {
      // const country = 'GB' // TODO: see above

      client.get(`/albums/${id}`).then(({ data }) => {
        setAlbum(data)
      })
    }
  }, [client, id, setAlbum])

  console.log(album)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <>
      <Header>{<Name>{album ? buildTitle(album) : 'Loading…'}</Name>}</Header>

      {album && <Player uris={album.tracks.items.map(track => track.uri)} />}
    </>
  )
})
