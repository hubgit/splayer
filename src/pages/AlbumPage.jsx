import {
  SpotifyClientContext,
  // SpotifyPlaybackContext,
} from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PlainLink, PopularityLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { scrollToTop, uriToID } from '../lib'

export const albumPath = album => `/albums/${uriToID(album.uri)}`

export const AlbumPage = React.memo(({ id }) => {
  const [album, setAlbum] = useState()
  const [tracks, setTracks] = useState()

  // const state = useContext(SpotifyPlaybackContext)

  const client = useContext(SpotifyClientContext)

  // const currentTrack = state ? state.track_window.current_track : undefined
  const currentTrack = undefined

  useEffect(() => {
    if (client) {
      client.get(`/albums/${id}`, {
        params: {
          market: 'from_token'
        }
      }).then(({ data: album }) => {
        setAlbum(album)

        console.log(album)

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
    scrollToTop()
  }, [id])

  if (!album || !tracks) {
    return null
  }

  const year = album.release_date.split('-').shift()

  return (
    <>
      <Player uris={tracks.map(track => track.uri)} />

      <Tracks>
        {tracks.map(track => (
          <TrackLink
            key={track.uri}
            to={`/tracks/${uriToID(track.uri)}`}
            popularity={track.popularity}
            currentTrack={currentTrack && currentTrack.uri === track.uri}
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
  
  &:before {
    display: inline-block;
    content: "${props => (props.currentTrack ? '>' : '')}";
  }
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
