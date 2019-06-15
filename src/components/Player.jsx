import { SpotifyPlaybackContext, SpotifyStateContext } from '@aeaton/react-spotify'
import React, { useContext, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { TrackContext } from '../providers/TrackProvider'
import { Image } from './Image'

const Container = styled.div`
  min-height: calc(100vh - 48px);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Player = React.memo(({ uris }) => {
  const { player, play } = useContext(SpotifyPlaybackContext)
  const state = useContext(SpotifyStateContext)
  const track = useContext(TrackContext)

  useLayoutEffect(() => {
    if (player) {
      play(uris)
    }
  }, [player, play, uris])

  return (
    <>
      <Container>
        {track && (
          <>
            {/*<div
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
                  fontSize: 32,
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
                      textAlign: 'center',
                    }}
                  >
                    {artist.name}
                  </PlainLink>
                </div>
              ))}
            </div>*/}

            {track.album && <Image album={track.album} paused={state.paused} />}
          </>
        )}
      </Container>
    </>
  )
})
