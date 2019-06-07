import React, { useState, useCallback } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useSpotifyClient } from '@aeaton/react-spotify'
import { CancelToken } from 'axios'

const initialQuery = {
  artist: '',
  album: '',
  track: '',
  genre: '',
  label: '',
  year: '',
}

let source

export const Search = ({ player }) => {
  const [query, setQuery] = useState(initialQuery)

  const client = useSpotifyClient()

  const play = useCallback(
    uris => {
      client.put(
        '/me/player/play',
        { uris },
        {
          params: {
            device_id: player._options.id,
          },
        }
      )
    },
    [client, player]
  )

  const search = useCallback(
    params => {
      if (source) {
        source.cancel()
      }

      source = CancelToken.source()

      return client.get('/search', {
        params,
        cancelToken: source.token,
      })
    },
    [client]
  )

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()

      const q = Object.keys(query)
        .filter(key => query[key])
        .map(key => `${key}:${query[key]}`)
        .join(' ')

      search({
        q,
        type: 'track',
      }).then(({ data: { tracks: { items } } }) => {
        if (items.length) {
          play(items.map(item => item.uri))
        }
      })
    },
    [play, query, search]
  )

  const handleChange = useCallback(
    field => event => {
      setQuery({
        ...query,
        [field]: event.target.value,
      })
    },
    [query, setQuery]
  )

  const handleReset = useCallback(() => {
    setQuery(initialQuery)
  }, [setQuery])

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      style={{
        display: 'grid',
        gridGap: 16,
        // gridRow: 'repeat(6, 1fr)',
        gridAutoFlow: 'column',
      }}
    >
      <TextField
        label={'Artist'}
        value={query.artist}
        onChange={handleChange('artist')}
      />

      <TextField
        label={'Album'}
        value={query.album}
        onChange={handleChange('album')}
      />

      <TextField
        label={'Track'}
        value={query.track}
        onChange={handleChange('track')}
      />

      <TextField
        label={'Genre'}
        value={query.genre}
        onChange={handleChange('genre')}
      />

      <TextField
        label={'Label'}
        value={query.label}
        onChange={handleChange('label')}
      />

      <TextField
        label={'Year'}
        value={query.year}
        onChange={handleChange('year')}
      />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant={'contained'}
          color={'primary'}
          size={'small'}
          type={'submit'}
        >
          Search
        </Button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button variant={'contained'} size={'small'} type={'reset'}>
          Reset
        </Button>
      </div>
    </form>
  )
}
