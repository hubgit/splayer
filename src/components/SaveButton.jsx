import { SpotifyClientContext } from '@aeaton/react-spotify'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import { CheckRounded, LibraryAddOutlined } from '@material-ui/icons'
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
      client.request({
        url: '/me/albums/contains',
        params: {
          ids: [uriToID(trackUri)].join(','),
        },
      }).then(([hasAlbum]) => {
        setHasAlbum(hasAlbum)
      })
    } else {
      setHasAlbum(false)
    }
  }, [client, trackUri])

  const saveAlbum = useCallback(() => {
    setSaving(true)
    setError(undefined)

    client.request({
      method: 'put',
      url: '/me/albums',
      data: [uriToID(track.album.uri)],
    })
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

    if (hasAlbum === true) {
      return <CheckRounded />
    }

    return <LibraryAddOutlined />
  }, [error, hasAlbum, saving])

  if (hasAlbum === undefined) {
    return (
      <MenuItem onClick={saveAlbum}>
        <ListItemIcon>…</ListItemIcon>
        <ListItemText primary="Loading…" />
      </MenuItem>
    )
  }

  return (
    <MenuItem onClick={saveAlbum}>
      <ListItemIcon>{statusIcon()}</ListItemIcon>
      <ListItemText primary="Save Album" />
    </MenuItem>
  )
}
