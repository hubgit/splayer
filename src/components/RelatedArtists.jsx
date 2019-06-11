import { SpotifyClientContext } from '@aeaton/react-spotify'
import { CancelToken } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { uriToID } from '../lib'
import { PlainLink } from './Links'

export const RelatedArtists = React.memo(
  ({ artist }) => {
    const [artists, setArtists] = useState()

    const client = useContext(SpotifyClientContext)

    useEffect(() => {
      if (client) {
        setArtists(undefined)

        const source = CancelToken.source()

        client
          .get(`/artists/${uriToID(artist.uri)}/related-artists`, {
            cancelToken: source.token,
          })
          .then(({ data: { artists } }) => {
            setArtists(artists)
          })

        return () => {
          source.cancel('Related artists fetch cancelled')
        }
      }
    }, [client, artist, setArtists])

    if (!artists) {
      return null
    }

    return (
      <Container>
        {artists.map(artist => (
          <ArtistLink
            key={artist.uri}
            to={`/artists/${uriToID(artist.uri)}`}
            popularity={artist.popularity}
          >
            {artist.name}
          </ArtistLink>
        ))}
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
`

const ArtistLink = styled(PlainLink)`
  display: inline-block;
  font-size: ${props => props.popularity}px;
  padding: 4px 1em;
  margin: 4px;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
    background: white;
    color: black;
  }
`
