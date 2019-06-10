import { useSpotifyClient } from '@aeaton/react-spotify'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PlainLink, PopularityLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { uriToID } from '../lib'

export const albumPath = album => `/albums/${uriToID(album.uri)}`

export const AlbumPage = React.memo(({ id }) => {
  const client = useSpotifyClient()

  // TODO: add read-private-country scope and add profile.country as country param
  // const { profile } = useContext(SpotifyProfileContext)

  const [album, setAlbum] = useState()
  const [tracks, setTracks] = useState()

  useEffect(() => {
    if (client) {
      // const country = 'GB' // TODO: see above

      client.get(`/albums/${id}`).then(({ data: album }) => {
        setAlbum(album)

        console.log(album)

        // client
        // .get(album.tracks.href)

        client
          .get('/tracks', {
            params: {
              ids: album.tracks.items
                .map(track => uriToID(track.uri))
                .join(','),
            },
          })
          .then(response => {
            setTracks(response.data.tracks)
          })
      })
    }
  }, [client, id, setAlbum, setTracks])

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: 'smooth' })
  }, [id])

  if (!album || !tracks) {
    return null
  }

  console.log({ album, tracks })

  const year = album.release_date.split('-').shift()
  const artist = album.artists[0]
  const genre = artist && artist.genres ? artist.genres[0] : ''

  return (
    <>
      <Player uris={tracks.map(track => track.uri)} />

      <Tracks>
        {tracks.map(track => (
          <TrackLink
            key={track.uri}
            to={`/tracks/${uriToID(track.uri)}`}
            popularity={track.popularity}
          >
            {track.name}
          </TrackLink>
        ))}
      </Tracks>

      <Info>
        <PlainLink to={`/albums?label=${album.label}&year=${year}`}>
          {album.label} - {year}
        </PlainLink>
      </Info>

      <RelatedArtists artist={album.artists[0]} />
    </>
  )
})

const TrackLink = styled(PopularityLink)`
  margin: 4px;
  display: flex;
  text-align: center;
`

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  font-size: 32px;
  background: white;
  color: black;
  min-height: 100vh;
`

const Tracks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  min-height: 100vh;
  justify-content: start;
`
