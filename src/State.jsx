import React, { useCallback, useEffect, useState } from 'react'
import { IconButton } from '@material-ui/core'
import {
  PlayCircleFilled,
  PauseCircleFilled,
  SkipNext,
  SkipPrevious,
} from '@material-ui/icons'
import { Album } from './Album'
import { Image } from './Image'
import { RelatedArtists } from './RelatedArtists'

let stateTimer

export const State = ({ player }) => {
  const [state, setState] = useState()

  useEffect(() => {
    player.addListener('player_state_changed', state => {
      setState(state)
    })

    if (stateTimer) {
      window.clearInterval(stateTimer)
    }

    stateTimer = window.setInterval(() => {
      player.getCurrentState().then(state => {
        setState(state)
      })
    }, 1000)
  }, [player])

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

  console.log(state)

  const {
    track_window: { current_track: track },
  } = state

  return (
    <div style={{ flex: 1, display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 16,
          }}
        >
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
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 16,
          }}
        >
          <a
            href={track.uri}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              font: '32px sans-serif',
              textAlign: 'center',
            }}
          >
            {track.name}
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 16,
          }}
        >
          {track.artists.map(artist => (
            <div key={artist.uri}>
              <a
                href={artist.uri}
                key={artist.uri}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  font: '20px sans-serif',
                }}
              >
                {artist.name}
              </a>
            </div>
          ))}
        </div>

        {track.album && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 32,
            }}
          >
            <Image album={track.album} state={state} />
          </div>
        )}
      </div>

      {track.album && <Album album={track.album} />}

      <RelatedArtists artist={track.artists[0]}/>
    </div>
  )
}
