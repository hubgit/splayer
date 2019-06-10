import { useSpotifyClient } from '@aeaton/react-spotify'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PlainLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { albumPath } from './AlbumPage'

export const TrackPage = React.memo(({ id }) => {
  const client = useSpotifyClient()

  // TODO: add read-private-country scope and add profile.country as country param
  // const { profile } = useContext(SpotifyProfileContext)

  const [track, setTrack] = useState()

  useEffect(() => {
    if (client) {
      // const country = 'GB' // TODO: see above

      client.get(`/tracks/${id}`).then(({ data }) => {
        setTrack(data)
      })
    }
  }, [client, id, setTrack])

  console.log(track)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!track) {
    return null
  }

  return (
    <>
      <Player uris={[track.uri]} />
      {/*          {track.release_date && (
            <div>{track.release_date.split('-').shift()}</div>
          )}*/}
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
