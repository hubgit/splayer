import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { artistNames, scrollToTop, uriToID } from '../lib'
import { ColorContext } from '../providers/ColorProvider'
import { SearchContext } from '../providers/SearchProvider'
import { TrackContext } from '../providers/TrackProvider'
import { AlbumSearchLink } from '../search/AlbumSearch'

const buildTitle = album => [artistNames(album.artists), album.name].join(' / ')

// const sum = items => {
//   let total = 0
//
//   for (const item of items) {
//     total += item
//   }
//
//   return total
// }

export const AlbumPage = React.memo(({ id }) => {
  const [album, setAlbum] = useState()
  const [tracks, setTracks] = useState()
  const [uris, setURIs] = useState()

  const currentTrack = useContext(TrackContext)
  const client = useContext(SpotifyClientContext)
  const { closeSearch } = useContext(SearchContext)
  const { backgroundColor } = useContext(ColorContext)

  useEffect(() => {
    if (id) {
      window.localStorage.setItem('album', id)
    }
  }, [id])

  useEffect(() => {
    setAlbum(undefined)
    setTracks(undefined)
    setURIs(undefined)

    client
      .request({
        url: `/albums/${id}`,
        params: {
          market: 'from_token',
        },
      })
      .then(album => {
        setAlbum(album)

        client
          .request({
            url: '/tracks',
            params: {
              market: 'from_token',
              ids: album.tracks.items
                .map(track => uriToID(track.uri))
                .join(','),
            },
          })
          .then(({ tracks }) => {
            setTracks(tracks)
            setURIs(tracks.map(track => track.uri))
          })
      })
  }, [client, id, setAlbum, setTracks])

  const playTrack = useCallback(
    index => {
      setURIs(tracks.slice(index).map(track => track.uri))
    },
    [tracks]
  )

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
      <Helmet>
        <title>Splayer: {buildTitle(album)}</title>
      </Helmet>

      <Player album={album} uris={uris} />

      <Tracks>
        {tracks.map((track, index) => (
          <Track
            key={track.uri}
            popularity={track.popularity}
            onClick={() => playTrack(index)}
            style={{
              backgroundColor:
                currentTrack && currentTrack.uri === track.uri
                  ? backgroundColor
                  : 'transparent',
            }}
          >
            {track.name}
          </Track>
        ))}
      </Tracks>

      <Info>
        <AlbumSearchLink query={{ label: album.label }}>
          {album.label}
        </AlbumSearchLink>
        <span> - </span>
        <AlbumSearchLink query={{ label: album.label, year }}>
          {year}
        </AlbumSearchLink>
      </Info>

      <RelatedArtists artist={album.artists[0]} />
    </>
  )
})

const Track = styled.div`
  margin: 4px;
  padding: 0 1ch;
  display: flex;
  text-align: center;
  cursor: pointer;
  font-size: ${props => Math.max(props.popularity, 12)}px;

  &:hover {
    background-color: yellow;
  }
`

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px;
  font-size: 24px;
  background: white;
  color: black;
  white-space: pre-wrap;
`

const Tracks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  //min-height: 100vh;
  //justify-content: start;
`
