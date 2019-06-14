import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { dateToYear, uriToID } from '../lib'
import { AlbumLink } from '../links/AlbumLink'
import { SearchForm } from '../search/SearchForm'
import { SearchLink } from './SearchLink'
import { SearchSplit } from './SearchSplit'

const Heading = styled.div`
  font-size: 30px;
  margin: 16px;
`

const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Artist = styled.div`
  color: #777;
  font-size: 16px;
`

const fields = ['album', 'artist', 'label', 'year']

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
      const ids = results.album.albums.items
        .filter(item => item.album_type === 'album')
        .slice(0, 20)
        .map(item => uriToID(item.uri))
        .join(',')

      client
        .get('/albums', {
          market: 'from_token',
          params: {
            ids,
          },
        })
        .then(response => setItems(response.data.albums))
    }
  }, [client, results.album])

  return (
    <SearchSplit>
      <div>
        <Heading>Albums</Heading>

        <SearchForm fields={fields} type={'album'} limit={50} />
      </div>

      <div>
        <Results>
          {items &&
            items.map(album => (
              <AlbumLink key={album.uri} album={album}>
                <div>{album.name}</div>

                <Artist>
                  {album.artists.map(artist => artist.name).join(', ')}
                  <span> / </span>
                  {album.release_date && dateToYear(album.release_date)}
                </Artist>
              </AlbumLink>
            ))}
        </Results>
      </div>
    </SearchSplit>
  )
}
