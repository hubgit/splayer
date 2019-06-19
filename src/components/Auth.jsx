import { SpotifyContext } from '@aeaton/react-spotify'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import { PowerSettingsNew } from '@material-ui/icons'
import React, { useContext } from 'react'

export const Auth = () => {
  const { logout } = useContext(SpotifyContext)

  return (
    <MenuItem onClick={logout}>
      <ListItemIcon>
        <PowerSettingsNew />
      </ListItemIcon>
      <ListItemText primary="Sign out" />
    </MenuItem>
  )
}
