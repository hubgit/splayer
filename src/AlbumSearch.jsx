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
  font-size: 20px;
`

export const AlbumSearch = () => {
  const [items, setItems] = useState()

  const handleData = useCallback(
    data => {
      setItems(data.albums.items)
    },
    [setItems]
  )

  return (
    <Container>
      <Heading>Find an Album</Heading>

      <Search
        fields={['artist', 'album']}
        type={'album'}
        handleData={handleData}
      />

      {items && (
        <Results>
          {items.map(album => (
            <Result key={album.uri} to={`/albums/${uriToID(album.uri)}`}>
              {album.name}
            </Result>
          ))}
        </Results>
      )}
    </Container>
  )
}
