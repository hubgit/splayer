import { IconButton } from '@material-ui/core'
import { SearchRounded } from '@material-ui/icons'
import React, { useContext } from 'react'
import ReactModal from 'react-modal'
import { SearchContext } from '../providers/SearchProvider'
import { SearchModal } from './SearchModal'

export const SearchButton = () => {
  const { isSearchOpen, closeSearch, toggleSearch } = useContext(SearchContext)

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

      <ReactModal
        isOpen={isSearchOpen}
        onRequestClose={closeSearch}
        appElement={document.getElementById('root')}
      >
        <SearchModal />
      </ReactModal>
    </>
  )
}
