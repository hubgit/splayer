import { IconButton } from '@material-ui/core/index'
import { HomeRounded } from '@material-ui/icons/index'
import { navigate } from '@reach/router'
import React, { useCallback, useContext } from 'react'
import { SearchContext } from '../providers/SearchProvider'

export const HomeButton = () => {
  const { closeSearch } = useContext(SearchContext)

  const navigateHome = useCallback(() => {
    closeSearch()
    navigate('/')
  }, [closeSearch])

  return (
    <IconButton onClick={navigateHome}>
      <HomeRounded />
    </IconButton>
  )
}
