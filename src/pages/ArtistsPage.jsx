import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PopularityLink } from '../components/Links'
import { Search } from '../components/Search'
import { scrollToTop, uriToID } from '../lib'

const Heading = styled.div`
  font-size: 30px;
  text-align: center;
`

const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const fields = ['artist', 'genre', 'label', 'year']

export const ArtistsPage = ({ location }) => {
  const [items, setItems] = useState()

  const handleData = useCallback(
    data => {
      setItems(data.artists.items)
    },
    [setItems]
  )

  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <>
      <Heading>Artists</Heading>

      <Search
        location={location}
        fields={fields}
        type={'artist'}
        handleData={handleData}
        route={'/artists'}
      />

      {items && (
        <Results>
          {items.map(artist => (
            <PopularityLink
              key={artist.uri}
              to={`/artists/${uriToID(artist.uri)}`}
              popularity={artist.popularity}
            >
              {artist.name}
            </PopularityLink>
          ))}
        </Results>
      )}
    </>
  )
}
