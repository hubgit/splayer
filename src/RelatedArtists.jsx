import { useSpotifyClient } from '@aeaton/react-spotify'
import { CancelToken } from 'axios'
import React, { useEffect, useState } from 'react'

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
        }}
      >
        {artists
          ? artists.map(artist => (
              <div
                key={artist.uri}
                style={{
                  display: 'inline-flex',
                  color: 'white',
                  fontSize: artist.popularity,
                  padding: '0 1em',
                  whiteSpace: 'nowrap',
                  alignItems: 'center',
                }}
              >
                {artist.name}
              </div>
            ))
          : 'Loading…'}
      </div>
    )
  },
  (prevProps, nextProps) => prevProps.artist.uri === nextProps.artist.uri
)
