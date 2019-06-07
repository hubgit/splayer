import { useSpotifyClient } from '@aeaton/react-spotify'
import React, { useEffect, useState } from 'react'

export const Track = React.memo(
  ({ track }) => {
    const client = useSpotifyClient()

    const [data, setData] = useState()

    useEffect(() => {
      if (client) {
        const id = track.uri.replace(/^spotify:track:/, '')

        client.get(`/tracks/${id}`).then(({ data }) => setData(data))
      }
    }, [track, client])

    if (!data) {
      return null
    }

    return (
      <div style={{ font: '14px monospace' }}>
        <div>Name: {data.name}</div>
      </div>
    )
  },
  (prevProps, nextProps) => prevProps.track.uri === nextProps.track.uri
)
