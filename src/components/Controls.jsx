import {
  SpotifyPlaybackContext,
  SpotifyStateContext,
} from '@aeaton/react-spotify'
import { Fade, IconButton, Menu } from '@material-ui/core'
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons'
import React, { useCallback, useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import { artistLinks } from '../lib'
import { TrackContext } from '../providers/TrackProvider'
import { SaveButton } from './SaveButton'

export const Controls = React.memo(() => {
  const { player } = useContext(SpotifyPlaybackContext)
  const state = useContext(SpotifyStateContext)
  const track = useContext(TrackContext)
  const [trackActionsOpen, setTrackActionsOpen] = useState(false)

  const trackAnchor = useRef()

  const togglePlay = useCallback(() => {
    player.togglePlay()
  }, [player])

  const toggleTrackActions = useCallback(() => {
    setTrackActionsOpen(value => !value)
  }, [])

  const closeTrackActions = useCallback(() => {
    setTrackActionsOpen(false)
  }, [])

  if (!state) {
    return null
  }

  return (
    <Container>
      <Buttons>
        {track && <Artists>{artistLinks(track.artists)}</Artists>}

        <IconButton onClick={togglePlay}>
          {state.paused ? <PlayCircleFilled /> : <PauseCircleFilled />}
        </IconButton>

        {/*{track && <Track>{track.name}</Track>}*/}
        {track && (
          <Track onClick={toggleTrackActions} ref={trackAnchor}>
            {track.album.name}
          </Track>
        )}

        <Menu
          marginThreshold={0}
          getContentAnchorEl={null}
          open={trackActionsOpen}
          anchorEl={trackAnchor.current}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          TransitionComponent={Fade}
          onClose={closeTrackActions}
        >
          <SaveButton />
        </Menu>
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

const Meta = styled.div`
  margin: 0 4px;
  width: 400px;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Artists = styled(Meta)`
  text-align: right;
`

const Track = styled(Meta)`
  text-align: left;
  font-style: italic;
  cursor: pointer;
`

/*
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
*/
