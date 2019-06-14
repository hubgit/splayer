import { SearchRounded } from '@material-ui/icons'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { SearchContext } from '../providers/SearchProvider'
import { ArtistSearch } from '../search/ArtistSearch'
import { AlbumSearch } from './AlbumSearch'
import { IconButton } from '@material-ui/core'

export const SearchButton = () => {
  const { isSearchOpen, results, toggleSearch } = useContext(SearchContext)

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
        <SearchModal>
          <ArtistSearch results={results} />
          <AlbumSearch results={results} />
        </SearchModal>
      )}
    </>
  )
}

const SearchModal = styled.div`
  background: white;
  padding: 16px;
  box-shadow: 0 1px 2px #aaa;
  border-radius: 4px;
  position: fixed;
  top: 16px;
  bottom: 64px;
  left: 16px;
  right: 16px;
  overflow-y: auto;
`
