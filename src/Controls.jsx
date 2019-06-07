import { IconButton } from '@material-ui/core'
import { PauseCircleFilled, PlayCircleFilled, SkipNext, SkipPrevious } from '@material-ui/icons'
import React, { useCallback } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Controls = React.memo(({ player, state }) => {
  const togglePlay = useCallback(() => {
    player.togglePlay()
  }, [player])

  const nextTrack = useCallback(() => {
    player.nextTrack()
  }, [player])

  const previousTrack = useCallback(() => {
    player.previousTrack()
  }, [player])

  return (
    <Container>
      <IconButton
        onClick={previousTrack}
        disabled={state.disallows.skipping_prev}
      >
        <SkipPrevious />
      </IconButton>

      <IconButton onClick={togglePlay}>
        {state.paused ? <PlayCircleFilled /> : <PauseCircleFilled />}
      </IconButton>

      <IconButton onClick={nextTrack} disabled={state.disallows.skipping_next}>
        <SkipNext />
      </IconButton>
    </Container>
  )
})
