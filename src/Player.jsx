import { SpotifyPlaybackContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PlainLink } from './components'
import { Controls } from './Controls'
import { Image } from './Image'
import { uriToID } from './lib'
import { RelatedArtists } from './RelatedArtists'

const Container = styled.div`
  min-height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Player = React.memo(({ uris }) => {
  const { player, play } = useContext(SpotifyPlaybackContext)

  const [state, setState] = useState()

  useEffect(() => {
    if (player) {
      player.addListener('player_state_changed', state => {
        setState(state)
      })
    }
  }, [player])

  useEffect(() => {
    if (player) {
      play(uris)
    }
  }, [player, play, uris])

  const track = state ? state.track_window.current_track : undefined

  return (
    <>
      <Container>
        {state && <Controls player={player} state={state} />}

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
                to={`/tracks/${uriToID(track.uri)}`}
                style={{
                  color: 'inherit',
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
                    to={`/artists/${uriToID(artist.uri)}`}
                    style={{
                      fontSize: 20,
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

      {track && track.artists && <RelatedArtists artist={track.artists[0]} />}
    </>
  )
})
