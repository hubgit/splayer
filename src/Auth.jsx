import { SpotifyContext } from '@aeaton/react-spotify'
import { IconButton } from '@material-ui/core'
import { PowerSettingsNew } from '@material-ui/icons'
import React, { useContext } from 'react'

export const Auth = () => {
  const { logout } = useContext(SpotifyContext)

  return (
    <IconButton onClick={logout}>
      <PowerSettingsNew />
    </IconButton>
  )
}
