import { Fade, Menu } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import { LibraryMusicRounded } from '@material-ui/icons'
import { navigate } from '@reach/router'
import React, { useCallback, useContext, useRef, useState } from 'react'
import icon from '../images/spotify-icon-green.png'
import { SearchContext } from '../providers/SearchProvider'
import { Auth } from './Auth'

export const Account = () => {
  const [open, setOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setOpen(value => !value)
  }, [])

  const closeMenu = useCallback(() => {
    setOpen(false)
  }, [])

  const { closeSearch } = useContext(SearchContext)

  const navigateHome = useCallback(() => {
    closeSearch()
    navigate('/')
  }, [closeSearch])

  const anchorRef = useRef()

  return (
    <div>
      <IconButton onClick={toggleMenu} ref={anchorRef}>
        <img src={icon} width={21} height={21} alt={'Account menu'} />
      </IconButton>

      <Menu
        marginThreshold={0}
        getContentAnchorEl={null}
        open={open}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        TransitionComponent={Fade}
        onClose={closeMenu}
      >
        <MenuItem onClick={navigateHome}>
          <ListItemIcon>
            <LibraryMusicRounded />
          </ListItemIcon>
          <ListItemText primary="Library" />
        </MenuItem>
        <Auth />
      </Menu>
    </div>
  )
}
