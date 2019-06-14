import React from 'react'
import styled from 'styled-components'
import { TrackLink } from '../links/TrackLink'
import { SearchForm } from '../search/SearchForm'
import { SearchSplit } from './SearchSplit'

const fields = ['track', 'artist', 'album', 'genre', 'label', 'year']

export const TrackSearch = ({ results }) => {
  return (
    <SearchSplit>
      <div>
        <Heading>Tracks</Heading>

        <SearchForm fields={fields} type={'track'} />
      </div>

      <div>
        <Results>
          {results &&
            results.track &&
            results.track.tracks.items.map(track => (
              <TrackLink key={track.uri} track={track}>
                {track.name}
                <Artists>
                  {track.artists.map(artist => artist.name).join(', ')}
                </Artists>
              </TrackLink>
            ))}
        </Results>
      </div>
    </SearchSplit>
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

const Artists = styled.div`
  font-size: 16px;
  color: #777;
`
