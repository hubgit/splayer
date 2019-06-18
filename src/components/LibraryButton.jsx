import { IconButton } from '@material-ui/core'
import { LibraryMusicRounded } from '@material-ui/icons'
import { navigate } from '@reach/router'
import React, { useCallback, useContext } from 'react'
import { SearchContext } from '../providers/SearchProvider'

export const LibraryButton = () => {
  const { closeSearch } = useContext(SearchContext)

  const navigateHome = useCallback(() => {
    closeSearch()
    navigate('/')
  }, [closeSearch])

  return (
    <IconButton onClick={navigateHome}>
      <LibraryMusicRounded />
    </IconButton>
  )
}
