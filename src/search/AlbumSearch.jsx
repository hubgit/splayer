import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchAlbums } from '../api'
import { artistNames, dateToYear } from '../lib'
import { AlbumLink } from '../links/AlbumLink'
import { SearchForm } from '../search/SearchForm'
import { SearchLink } from './SearchLink'
import { SearchSplit } from './SearchSplit'

const fields = ['artist', 'album', 'label', 'year']

export const AlbumSearchLink = ({ query, children }) => (
  <SearchLink query={query} fields={fields} type={'album'}>
    {children}
  </SearchLink>
)

export const AlbumSearch = ({ results }) => {
  const [items, setItems] = useState()

  const client = useContext(SpotifyClientContext)

  useEffect(() => {
    if (results.album) {
      fetchAlbums(results.album.albums.items, client, setItems)
    }
  }, [client, results.album])

  return (
    <SearchSplit>
      <SearchForm fields={fields} type={'album'} limit={50} />

      <Results>
        {items &&
          items.map(album => (
            <AlbumLink key={album.uri} album={album}>
              <div>{album.name}</div>

              <Artist>
                {artistNames(album.artists)}
                <span> / </span>
                {album.release_date && dateToYear(album.release_date)}
              </Artist>
            </AlbumLink>
          ))}
      </Results>
    </SearchSplit>
  )
}

const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Artist = styled.div`
  color: #777;
  font-size: 16px;
`
