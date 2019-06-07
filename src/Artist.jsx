import { useSpotifyClient } from '@aeaton/react-spotify'
import React, { useEffect, useState } from 'react'

export const Artist = React.memo(
  ({ artist }) => {
    const client = useSpotifyClient()

    const [data, setData] = useState()

    useEffect(() => {
      if (client) {
        const id = artist.uri.replace(/^spotify:artist:/, '')

        client.get(`/artists/${id}`).then(({ data }) => setData(data))
      }
    }, [artist, client])

    if (!data) {
      return null
    }

    console.log(data)

    return (
      <div style={{ font: '14px monospace' }}>
        <div>Name: {data.name}</div>
        {data.genres && <div>Genres: {data.genres.join(', ')}</div>}
      </div>
    )
  },
  (prevProps, nextProps) => prevProps.artist.uri === nextProps.artist.uri
)
