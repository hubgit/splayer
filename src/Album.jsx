import { useSpotifyClient } from '@aeaton/react-spotify'
import React, { useEffect, useState } from 'react'

export const Album = React.memo(
  ({ album }) => {
    const client = useSpotifyClient()

    const [data, setData] = useState()

    useEffect(() => {
      if (client) {
        client
          .get('/albums', {
            params: {
              ids: [album.uri.replace(/^spotify:album:/, '')].join(','),
            },
          })
          .then(({ data: { albums } }) => {
            if (albums.length) {
              setData(albums[0])
            }
          })
      }
    }, [album, client])

    if (!data) {
      return null
    }

    console.log(data)

    return (
      <div style={{ font: '14px monospace', width: 400, marginTop: 32 }}>
        <div>Artist: {data.artists.map(artist => artist.name).join(', ')}</div>
        <div>Album: {data.name}</div>
        <div>Label: {data.label}</div>
        <div>Year: {data.release_date.split('-').shift()}</div>
      </div>
    )
  },
  (prevProps, nextProps) => prevProps.album.uri === nextProps.album.uri
)
