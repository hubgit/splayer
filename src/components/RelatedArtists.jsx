import { useSpotifyClient } from '@aeaton/react-spotify'
import { CancelToken } from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { uriToID } from '../lib'
import { PlainLink } from './Links'

export const RelatedArtists = React.memo(
  ({ artist }) => {
    const client = useSpotifyClient()

    const [artists, setArtists] = useState()

    useEffect(() => {
      if (client) {
        setArtists(undefined)

        const source = CancelToken.source()

        client
          .get(
            `/artists/${artist.uri.replace(
              /^spotify:artist:/,
              ''
            )}/related-artists`,
            {
              cancelToken: source.token,
            }
          )
          .then(({ data: { artists } }) => {
            setArtists(artists)
          })

        return () => {
          source.cancel('Related artists fetch cancelled')
        }
      }
    }, [client, artist, setArtists])

    return (
      <Container>
        {artists ? (
          <div>
            {artists.map(artist => (
              <ArtistLink
                key={artist.uri}
                to={`/artists/${uriToID(artist.uri)}`}
                popularity={artist.popularity}
              >
                {artist.name}
              </ArtistLink>
            ))}
          </div>
        ) : (
          'Loading…'
        )}
      </Container>
    )
  },
  (prevProps, nextProps) => prevProps.artist.uri === nextProps.artist.uri
)

const Container = styled.div`
  min-height: 100vh;
  background: black;
  color: white;
  padding: 64px 32px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ArtistLink = styled(PlainLink)`
  display: inline-flex;
  font-size: ${props => props.popularity}px;
  padding: 0 1em;
  white-space: nowrap;
  align-items: center;

  &:hover {
    text-decoration: none;
    background: white;
    color: black;
  }
`
