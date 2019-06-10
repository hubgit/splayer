import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PlainLink } from '../components/Links'
import { Search } from '../components/Search'
import { uriToID } from '../lib'

const Heading = styled.div`
  font-size: 30px;
  text-align: center;
`

const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Result = styled(PlainLink)`
  font-size: ${props => props.popularity}px;
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
    window.scrollTo(0, 0, { behavior: 'smooth' })
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
            <Result
              key={artist.uri}
              to={`/artists/${uriToID(artist.uri)}`}
              popularity={artist.popularity}
            >
              {artist.name}
            </Result>
          ))}
        </Results>
      )}
    </>
  )
}
