import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PlainLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { scrollToTop, uriToID } from '../lib'
import { SearchContext } from '../providers/SearchProvider'
import { albumPath } from './AlbumPage'

export const trackPath = track => `/tracks/${uriToID(track.uri)}`

export const TrackPage = React.memo(({ id }) => {
  const [track, setTrack] = useState()
  const [uris, setURIs] = useState()

  const client = useContext(SpotifyClientContext)
  const { closeSearch } = useContext(SearchContext)

  useEffect(() => {
    if (client) {
      client
        .get(`/tracks/${id}`, {
          params: {
            market: 'from_token',
          },
        })
        .then(({ data }) => {
          setTrack(data)
          setURIs([data.uri])
        })
    }
  }, [client, id])

  useEffect(() => {
    closeSearch()
    scrollToTop()
  }, [id, closeSearch])

  if (!track) {
    return null
  }

  return (
    <>
      <Player uris={uris} />

      {track.album && (
        <AlbumLink to={albumPath(track.album)}>{track.album.name}</AlbumLink>
      )}

      <RelatedArtists artist={track.artists[0]} />

      {track.label && (
        <LabelLink to={`/albums/?label=${track.label}`}>
          {track.label}
        </LabelLink>
      )}
    </>
  )
})

const AlbumLink = styled(PlainLink)`
  font-size: 32px;
  text-align: center;
  display: flex;
  padding: 32px;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`

const LabelLink = styled(PlainLink)`
  font-size: 32px;
  text-align: center;
  display: flex;
  padding: 32px;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`
