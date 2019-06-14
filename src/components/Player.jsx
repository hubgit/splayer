import {
  SpotifyPlaybackContext,
  SpotifyStateContext,
} from '@aeaton/react-spotify'
import React, { useContext, useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { ArtistLink } from '../links/ArtistLink'
import { artistPath } from '../pages/ArtistPage'
import { trackPath } from '../pages/TrackPage'
import { TrackContext } from '../providers/TrackProvider'
import { Image } from './Image'
import { PlainLink } from './Links'

const buildTitle = track =>
  [
    track.artists.map(artist => artist.name).join(', '),
    track.album.name,
    track.name,
  ].join(' / ')

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
  const track = useContext(TrackContext)

  useLayoutEffect(() => {
    if (player) {
      play(uris)
    }
  }, [player, play, uris])

  return (
    <>
      <Helmet>
        <title>Splayer: {track ? buildTitle(track) : ''}</title>
      </Helmet>

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
