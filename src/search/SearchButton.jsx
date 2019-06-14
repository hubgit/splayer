import { IconButton } from '@material-ui/core'
import { SearchRounded } from '@material-ui/icons'
import React, { useContext } from 'react'
import { SearchContext } from '../providers/SearchProvider'
import { SearchModal } from './SearchModal'

export const SearchButton = () => {
  const { isSearchOpen, toggleSearch } = useContext(SearchContext)

  return (
    <>
      <IconButton
        onClick={toggleSearch}
        style={{
          backgroundColor: isSearchOpen ? 'white' : 'transparent',
        }}
      >
        <SearchRounded />
      </IconButton>
      {isSearchOpen && (
        <SearchModal/>
      )}
    </>
  )
}
