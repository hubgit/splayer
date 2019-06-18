import React from 'react'
import styled from 'styled-components'
import { artistNames } from '../lib'
import { TrackLink } from '../links/TrackLink'
import { SearchForm } from '../search/SearchForm'
import { SearchSplit } from './SearchSplit'

const fields = ['track', 'artist', 'album', 'genre', 'label', 'year']

export const TrackSearch = ({ results }) => {
  return (
    <SearchSplit>
      <SearchForm fields={fields} type={'track'} />

      <Results>
        {results &&
          results.track &&
          results.track.tracks.items.map(track => (
            <TrackLink key={track.uri} track={track}>
              {track.name}
              <Artists>{artistNames(track.artists)}</Artists>
            </TrackLink>
          ))}
      </Results>
    </SearchSplit>
  )
}

const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Artists = styled.div`
  font-size: 16px;
  color: #777;
`
