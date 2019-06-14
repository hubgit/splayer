import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PopularityLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { scrollToTop, uriToID } from '../lib'
import { SearchContext } from '../providers/SearchProvider'
import { TrackContext } from '../providers/TrackProvider'
import { AlbumSearchLink } from '../search/AlbumSearch'
import { trackPath } from './TrackPage'

export const AlbumPage = React.memo(({ id }) => {
  const [album, setAlbum] = useState()
  const [tracks, setTracks] = useState()
  const [uris, setURIs] = useState()

  const currentTrack = useContext(TrackContext)
  const client = useContext(SpotifyClientContext)
  const { closeSearch } = useContext(SearchContext)

  useEffect(() => {
    setAlbum(undefined)
    setTracks(undefined)
    setURIs(undefined)

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
  
  &::before {
    display: inline-block;
    padding-right: 8px;
    content: "${props => (props.currentTrack ? '>' : '')}";
  }
  
  &::after {
    display: inline-block;
    padding-left: 8px;
    content: "${props => (props.currentTrack ? ' <' : '')}";
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
`

const Tracks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 32px;
`
