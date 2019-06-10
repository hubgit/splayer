import { useSpotifyClient } from '@aeaton/react-spotify'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ArtistAlbums } from '../components/ArtistAlbums'
import { PlainLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'

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

  if (!artist) {
    return null
  }

  return (
    <>
      {uris && <Player uris={uris} />}
      {/* <div
        style={{
          fontSize: 64,
          textDecoration: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {artist.name}
      </div>*/}

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
