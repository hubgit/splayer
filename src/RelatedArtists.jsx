import { useSpotifyClient } from '@aeaton/react-spotify'
import { Link } from '@reach/router'
import { CancelToken } from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { uriToID } from './lib'

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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          background: 'black',
          overflow: 'hidden',
          padding: 16,
        }}
      >
        {artists
          ? artists.map(artist => (
              <ArtistLink
                key={artist.uri}
                to={`/artists/${uriToID(artist.uri)}`}
                popularity={artist.popularity}
              >
                {artist.name}
              </ArtistLink>
            ))
          : 'Loading…'}
      </div>
    )
  },
  (prevProps, nextProps) => prevProps.artist.uri === nextProps.artist.uri
)

const ArtistLink = styled(Link)`
  display: inline-flex;
  color: white;
  font-size: ${props => props.popularity}px;
  padding: 0 1em;
  white-space: nowrap;
  align-items: center;
  text-decoration: none;
`
