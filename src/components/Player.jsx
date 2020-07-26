import { SpotifyPlaybackContext } from '@aeaton/react-spotify'
import React, { useContext, useLayoutEffect } from 'react'
import styled from 'styled-components'
// import { TrackContext } from '../providers/TrackProvider'
import { CoverImage } from './CoverImage'

export const Player = React.memo(({ album, autoplay = true, uris }) => {
  const { player, play } = useContext(SpotifyPlaybackContext)
  // const track = useContext(TrackContext)

  useLayoutEffect(() => {
    let wakeLock = null
    
    if (player && autoplay) {
      play(uris)

      if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen')
      }
    }
    
    return () => {
      if (wakeLock) {
        wakeLock.release()
      }
    }
  }, [autoplay, player, play, uris])

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
