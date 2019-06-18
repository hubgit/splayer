import React from 'react'
import styled from 'styled-components'
import { ArtistLink } from '../links/ArtistLink'
import { SearchForm } from '../search/SearchForm'
import { SearchLink } from '../search/SearchLink'
import { SearchSplit } from './SearchSplit'

const fields = ['artist', 'genre', 'label', 'year']

export const ArtistSearchLink = ({ query, children }) => (
  <SearchLink query={query} fields={fields} type={'artist'}>
    {children}
  </SearchLink>
)

export const ArtistSearch = ({ results }) => {
  return (
    <SearchSplit>
      <SearchForm fields={fields} type={'artist'} />

      <Results>
        {results &&
        results.artist &&
        results.artist.artists.items.map(artist => (
          <Result key={artist.uri} artist={artist}>
            {artist.name}
          </Result>
        ))}
      </Results>
    </SearchSplit>
  )
}

const Result = styled(ArtistLink)`
  margin: 8px;
  display: block;
`

const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`
