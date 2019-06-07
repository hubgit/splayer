import { useSpotifyClient } from '@aeaton/react-spotify'
import React, { useEffect, useState } from 'react'

export const Album = React.memo(
  ({ album }) => {
    const client = useSpotifyClient()

    const [data, setData] = useState()

    useEffect(() => {
      if (client) {
        const id = album.uri.replace(/^spotify:album:/, '')

        client.get(`/albums/${id}`).then(({ data }) => setData(data))
      }
    }, [album, client])

    if (!data) {
      return null
    }

    console.log(data)

    return (
      <div style={{ font: '14px monospace' }}>
        <div>Artist: {data.artists.map(artist => artist.name).join(', ')}</div>
        <div>Album: {data.name}</div>
        <div>Label: {data.label}</div>
        <div>Year: {data.release_date.split('-').shift()}</div>
      </div>
    )
  },
  (prevProps, nextProps) => prevProps.album.uri === nextProps.album.uri
)
