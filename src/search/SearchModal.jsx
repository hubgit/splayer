import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { SearchContext } from '../providers/SearchProvider'
import { AlbumSearch } from './AlbumSearch'
import { ArtistSearch } from './ArtistSearch'
import { TrackSearch } from './TrackSearch'

const searchTypes = ['artist', 'album', 'track']

export const SearchModal = () => {
  const [active, setActive] = useState(0)

  const { results, query, search } = useContext(SearchContext)

  useEffect(() => {
    if (query && query.type) {
      const index = searchTypes.indexOf(query.type)
      setActive(index)
    }
  }, [query])

  const handleChange = useCallback(
    (event, value) => {
      setActive(value)
      search({
        ...query,
        type: searchTypes[value],
      })
    },
    [query, search]
  )

  return (
    <Container>
      <Tabs
        value={active}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label={'Artists'} />
        <Tab label={'Albums'} />
        <Tab label={'Tracks'} />
      </Tabs>

      {active === 0 && <ArtistSearch results={results} />}
      {active === 1 && <AlbumSearch results={results} />}
      {active === 2 && <TrackSearch results={results} />}
    </Container>
  )
}

const Container = styled.div`
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
