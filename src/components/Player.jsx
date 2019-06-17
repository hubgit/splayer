import { SpotifyPlaybackContext } from '@aeaton/react-spotify'
import React, { useContext, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { TrackContext } from '../providers/TrackProvider'
import { CoverImage } from './CoverImage'

export const Player = React.memo(({ uris }) => {
  const { player, play } = useContext(SpotifyPlaybackContext)
  const track = useContext(TrackContext)

  useLayoutEffect(() => {
    if (player) {
      play(uris)
    }
  }, [player, play, uris])

  return (
    <Container>
      {track && track.album && <CoverImage album={track.album} />}
    </Container>
  )
})

const Container = styled.div`
  min-height: calc(100vh - 48px);
  display: flex;
  align-items: center;
  justify-content: center;
`
