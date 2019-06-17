import {
  SpotifyPlaybackContext,
  SpotifyStateContext,
} from '@aeaton/react-spotify'
import { IconButton } from '@material-ui/core'
import {
  PauseCircleFilled,
  PlayCircleFilled,
  SkipNext,
  SkipPrevious,
} from '@material-ui/icons'
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { artistNames } from '../lib'
import { TrackContext } from '../providers/TrackProvider'

export const Controls = React.memo(() => {
  const { player } = useContext(SpotifyPlaybackContext)
  const state = useContext(SpotifyStateContext)
  const track = useContext(TrackContext)

  const togglePlay = useCallback(() => {
    player.togglePlay()
  }, [player])

  const nextTrack = useCallback(() => {
    player.nextTrack()
  }, [player])

  const previousTrack = useCallback(() => {
    player.previousTrack()
  }, [player])

  if (!state) {
    return null
  }

  return (
    <Container>
      <Info>
        {track && (
          <>
            <div>{artistNames(track.artists)}</div>
            <div style={{ fontStyle: 'italic' }}>{track.name}</div>
          </>
        )}
      </Info>

      <Buttons>
        <IconButton
          onClick={previousTrack}
          disabled={state.disallows.skipping_prev}
        >
          <SkipPrevious />
        </IconButton>

        <IconButton onClick={togglePlay}>
          {state.paused ? <PlayCircleFilled /> : <PauseCircleFilled />}
        </IconButton>

        <IconButton
          onClick={nextTrack}
          disabled={state.disallows.skipping_next}
        >
          <SkipNext />
        </IconButton>
      </Buttons>
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  margin: 8px;
`
