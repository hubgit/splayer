import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ArtistAlbums } from '../components/ArtistAlbums'
import { PlainLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { scrollToTop } from '../lib'

export const ArtistPage = ({ id }) => {
  const [uris, setURIs] = useState()
  const [artist, setArtist] = useState()

  const client = useContext(SpotifyClientContext)

  useEffect(() => {
    if (client) {
      client.get(`/artists/${id}`).then(({ data }) => setArtist(data))

      client
        .get(`/artists/${id}/top-tracks`, {
          params: {
            market: 'from_token',
          },
        })
        .then(response => {
          setURIs(response.data.tracks.map(track => track.uri))
        })
    }
  }, [client, id, setArtist, setURIs])

  useEffect(() => {
    scrollToTop()
  }, [id])

  if (!artist) {
    return null
  }

  return (
    <>
      {uris && <Player uris={uris} />}

      <ArtistAlbums artist={artist} />

      {artist.genres && (
        <Genres>
          {artist.genres.map((genre, index) => (
            <span key={index}>
              {index > 0 && ', '}
              <PlainLink to={`/artists?genre=${genre}`}>{genre}</PlainLink>
            </span>
          ))}
        </Genres>
      )}

      <RelatedArtists artist={artist} />
    </>
  )
}

const Genres = styled.div`
  background: black;
  color: white;
  font-size: 20px;
  font-family: monospace;
  text-align: center;
  padding: 32px;
`
