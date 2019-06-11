import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PopularityLink } from '../components/Links'
import { Search } from '../components/Search'
import { scrollToTop, uriToID } from '../lib'

const fields = ['track', 'artist', 'album', 'genre', 'label', 'year']

export const TracksPage = ({ location }) => {
  const [items, setItems] = useState()

  const handleData = useCallback(
    data => {
      setItems(data.tracks.items)
    },
    [setItems]
  )

  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <>
      <Heading>Tracks</Heading>

      <Search
        location={location}
        fields={fields}
        type={'track'}
        handleData={handleData}
        route={'/tracks'}
      />

      {items && (
        <Results>
          {items.map(track => (
            <Result
              key={track.uri}
              to={`/tracks/${uriToID(track.uri)}`}
              popularity={track.popularity}
            >
              {track.name}
              <Artist>
                {track.artists.map(artist => artist.name).join(', ')}
              </Artist>
            </Result>
          ))}
        </Results>
      )}
    </>
  )
}

const Heading = styled.div`
  font-size: 30px;
  text-align: center;
`

const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Result = styled(PopularityLink)`
  text-align: center;
  margin: 8px;
`

const Artist = styled.div`
  font-size: 16px;
  color: #777;
`
