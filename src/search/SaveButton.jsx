import {
  SpotifyClientContext,
  SpotifyStateContext,
} from '@aeaton/react-spotify'
import { IconButton } from '@material-ui/core'
import { CheckRounded, SaveRounded, SyncRounded } from '@material-ui/icons'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { uriToID } from '../lib'

export const SaveButton = () => {
  const [hasAlbum, setHasAlbum] = useState()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState()
  const [track, setTrack] = useState()

  const client = useContext(SpotifyClientContext)
  const state = useContext(SpotifyStateContext)

  useEffect(() => {
    const track = state ? state.track_window.current_track : undefined

    setTrack(track)

    setHasAlbum(undefined)

    if (track && track.album && track.album.uri) {
      client
        .get('/me/albums/contains', {
          params: {
            ids: [uriToID(track.album.uri)].join(','),
          },
        })
        .then(response => {
          const [hasAlbum] = response.data

          setHasAlbum(hasAlbum)
        })
    } else {
      setHasAlbum(false)
    }
  }, [client, state])

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
      return <SyncRounded color={'error'} />
    }

    if (saving) {
      return <SaveRounded color={'action'} />
    }

    return <SaveRounded />
  }, [error, saving])

  if (!state || !client || !track || !track.album || !track.album.uri) {
    return null
  }

  if (hasAlbum === undefined) {
    return null
  }

  return hasAlbum ? (
    <IconButton disabled={true}>
      <CheckRounded />
    </IconButton>
  ) : (
    <IconButton onClick={saveAlbum}>{statusIcon()}</IconButton>
  )
}
