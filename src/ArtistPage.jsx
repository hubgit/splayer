import { useSpotifyClient } from '@aeaton/react-spotify'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Albums } from './Albums'
import { Header } from './Header'
import { Player } from './Player'

const Name = styled.div`
  margin: 0 16px;
`

const Genres = styled.div`
  background: black;
  color: white;
  font-size: 20px;
  font-family: monospace;
  text-align: center;
  padding: 32px;
`

export const ArtistPage = ({ id }) => {
  const client = useSpotifyClient()

  // TODO: add read-private-country scope and add profile.country as country param
  // const { profile } = useContext(SpotifyProfileContext)

  const [uris, setURIs] = useState()
  const [artist, setArtist] = useState()

  useEffect(() => {
    if (client) {
      const country = 'GB' // TODO: see above

      client.get(`/artists/${id}`).then(({ data }) => setArtist(data))

      client
        .get(`/artists/${id}/top-tracks`, {
          params: { country },
        })
        .then(response => {
          setURIs(response.data.tracks.map(track => track.uri))
        })
    }
  }, [client, id, setArtist, setURIs])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <>
      <Header>{<Name>{artist ? artist.name : 'Loading…'}</Name>}</Header>

      {uris && <Player uris={uris} />}

      {artist && <Albums artist={artist} />}

      {artist && artist.genres && <Genres>{artist.genres.join(', ')}</Genres>}
    </>
  )
}
