import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PopularityLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { scrollToTop, uriToID } from '../lib'
import { SearchContext } from '../providers/SearchProvider'
import { AlbumSearchLink } from '../search/AlbumSearch'
import { trackPath } from './TrackPage'

export const albumPath = album => `/albums/${uriToID(album.uri)}`

export const AlbumPage = React.memo(({ id }) => {
  const [album, setAlbum] = useState()
  const [tracks, setTracks] = useState()
  const [uris, setURIs] = useState()

  // const state = useContext(SpotifyPlaybackContext)

  const client = useContext(SpotifyClientContext)
  const { closeSearch } = useContext(SearchContext)

  // const currentTrack = state ? state.track_window.current_track : undefined
  const currentTrack = undefined

  useEffect(() => {
    if (client) {
      client
        .get(`/albums/${id}`, {
          params: {
            market: 'from_token',
          },
        })
        .then(({ data: album }) => {
          setAlbum(album)

          client
            .get('/tracks', {
              params: {
                ids: album.tracks.items
                  .map(track => uriToID(track.uri))
                  .join(','),
              },
            })
            .then(response => {
              const { tracks } = response.data
              setTracks(tracks)
              setURIs(tracks.map(track => track.uri))
            })
        })
    }
  }, [client, id, setAlbum, setTracks])

  useEffect(() => {
    closeSearch()
    scrollToTop()
  }, [id, closeSearch])

  if (!album || !tracks) {
    return null
  }

  const year = album.release_date.split('-').shift()

  return (
    <>
      <Player uris={uris} />

      <Tracks>
        {tracks.map(track => (
          <TrackLink
            key={track.uri}
            to={trackPath(track)}
            popularity={track.popularity}
            currentTrack={currentTrack && currentTrack.uri === track.uri}
          >
            {track.name}
          </TrackLink>
        ))}
      </Tracks>

      <Info>
        <AlbumSearchLink query={{ label: album.label, year }}>
          {album.label} - {year}
        </AlbumSearchLink>
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
  padding: 32px;
  min-height: 100vh;
  justify-content: start;
`
