import { SpotifyPlaybackContext, SpotifyStateContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { artistPath } from '../pages/ArtistPage'
import { trackPath } from '../pages/TrackPage'
import { Image } from './Image'
import { PlainLink } from './Links'

const Container = styled.div`
  min-height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Player = React.memo(({ uris }) => {
  const { player, play } = useContext(SpotifyPlaybackContext)
  const state = useContext(SpotifyStateContext)

  useEffect(() => {
    if (player) {
      play(uris)
    }
  }, [player, play, uris])

  const track = state ? state.track_window.current_track : undefined

  return (
    <>
      <Container>
        {track && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 8,
              }}
            >
              <PlainLink
                to={trackPath(track)}
                style={{
                  color: 'inherit',
                  fontSize: 40,
                  textAlign: 'center',
                }}
              >
                {track.name}
              </PlainLink>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 8,
              }}
            >
              {track.artists.map(artist => (
                <div key={artist.uri}>
                  <PlainLink
                    to={artistPath(artist)}
                    style={{
                      fontSize: 24,
                    }}
                  >
                    {artist.name}
                  </PlainLink>
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
                <Image album={track.album} paused={state.paused} />
              </div>
            )}
          </>
        )}
      </Container>
    </>
  )
})
