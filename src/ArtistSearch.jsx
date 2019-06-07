import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { PlainLink } from './components'
import { uriToID } from './lib'
import { Search } from './Search'

const Container = styled.section`
  margin: 16px;
  background: white;
`

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
`

export const ArtistSearch = () => {
  const [items, setItems] = useState()

  const handleData = useCallback(
    data => {
      setItems(data.artists.items)
    },
    [setItems]
  )

  return (
    <Container>
      <Heading>Find an Artist</Heading>

      <Search
        fields={['artist', 'genre', 'label', 'year']}
        type={'artist'}
        handleData={handleData}
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
    </Container>
  )
}
