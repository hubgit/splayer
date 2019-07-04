import React, { useContext } from 'react'
import styled from 'styled-components'
import { dateToYear } from '../lib'
import { trackPath } from '../pages/TrackPage'
import { ColorContext } from '../providers/ColorProvider'
import { PopularityLink } from './Links'

export const ArtistTracks = ({ currentTrack, tracks }) => {
  const { backgroundColor } = useContext(ColorContext)

  return (
    <Tracks>
      <div>tracks</div>

      {tracks &&
        tracks.map(track => (
          <TrackLink
            key={track.uri}
            to={trackPath(track)}
            popularity={track.popularity}
          >
            <TrackName
              style={{
                backgroundColor:
                  currentTrack && currentTrack.uri === track.uri
                    ? backgroundColor
                    : 'none',
              }}
            >
              {track.name}
            </TrackName>

            <Year>{dateToYear(track.album.release_date)}</Year>
          </TrackLink>
        ))}
    </Tracks>
  )
}

const Year = styled.div`
  font-size: 14px;
  color: #777;
  margin: 8px;
`

const TrackName = styled.div`
  display: flex;
  text-align: center;
  padding: 0 8px;
`

const TrackLink = styled(PopularityLink)`
  margin: 4px;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`

const Tracks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  min-height: 100vh;
  justify-content: start;
`
