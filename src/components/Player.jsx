import { SpotifyPlaybackContext } from '@aeaton/react-spotify'
import React, { useContext, useLayoutEffect } from 'react'
import styled from 'styled-components'
// import { TrackContext } from '../providers/TrackProvider'
import { CoverImage } from './CoverImage'

export const Player = React.memo(({ album, uris }) => {
  const { player, play } = useContext(SpotifyPlaybackContext)
  // const track = useContext(TrackContext)

  useLayoutEffect(() => {
    if (player) {
      play(uris)

      if (window.WakeLock) {
        const { signal } = new AbortController()

        window.WakeLock.request('system', { signal })

        // signal.abort()
      }
    }
  }, [player, play, uris])

  if (!album) {
    return null
  }

  return (
    <Container>
      <CoverImage album={album} />
    </Container>
  )
})

const Container = styled.div`
  min-height: calc(100vh - 48px);
  display: flex;
  align-items: center;
  justify-content: center;
`
