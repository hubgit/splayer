import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PlainLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { scrollToTop } from '../lib'
import { albumPath } from './AlbumPage'

export const TrackPage = React.memo(({ id }) => {
  const client = useContext(SpotifyClientContext)

  const [track, setTrack] = useState()

  useEffect(() => {
    if (client) {
      client
        .get(`/tracks/${id}`, {
          params: {
            market: 'from_token',
          }
        })
        .then(({ data }) => {
          setTrack(data)
        })
    }
  }, [client, id, setTrack])

  useEffect(() => {
    scrollToTop()
  }, [id])

  if (!track) {
    return null
  }

  return (
    <>
      <Player uris={[track.uri]} />

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
