import { SpotifyClientContext } from '@aeaton/react-spotify'
import { IconButton } from '@material-ui/core'
import { LibraryAddOutlined } from '@material-ui/icons'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { uriToID } from '../lib'
import { TrackContext } from '../providers/TrackProvider'

export const SaveButton = () => {
  const [hasAlbum, setHasAlbum] = useState()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState()

  const client = useContext(SpotifyClientContext)
  const track = useContext(TrackContext)

  const trackUri = track && track.album ? track.album.uri : undefined

  useEffect(() => {
    setHasAlbum(undefined)

    if (trackUri) {
      client
        .get('/me/albums/contains', {
          params: {
            ids: [uriToID(trackUri)].join(','),
          },
        })
        .then(response => {
          const [hasAlbum] = response.data

          setHasAlbum(hasAlbum)
        })
    } else {
      setHasAlbum(false)
    }
  }, [client, trackUri])

  const saveAlbum = useCallback(() => {
    setSaving(true)
    setError(undefined)

    client
      .put('/me/albums', [uriToID(track.album.uri)])
      .then(() => {
        setSaving(false)
        setHasAlbum(true)
      })
      .catch(error => {
        setSaving(false)
        setError(error)
      })
  }, [client, track])

  const statusIcon = useCallback(() => {
    if (error) {
      return <LibraryAddOutlined color={'error'} />
    }

    if (saving) {
      return <LibraryAddOutlined color={'action'} />
    }

    return <LibraryAddOutlined />
  }, [error, saving])

  if (hasAlbum !== false) {
    return null
  }

  return <IconButton onClick={saveAlbum}>{statusIcon()}</IconButton>
}
