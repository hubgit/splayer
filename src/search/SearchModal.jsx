import React, { useCallback, useContext, useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'
import { SearchContext } from '../providers/SearchProvider'
import { AlbumSearch } from './AlbumSearch'
import { ArtistSearch } from './ArtistSearch'

export const SearchModal = () => {
  const [active, setActive] = useState(0)

  const { results } = useContext(SearchContext)

  const handleChange = useCallback(
    (event, value) => {
      setActive(value)
    },
    [setActive]
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
