import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { ArtistAlbums } from '../components/ArtistAlbums'
import { PopularityLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { dateToYear, scrollToTop } from '../lib'
import { SearchContext } from '../providers/SearchProvider'
import { TrackContext } from '../providers/TrackProvider'
import { ArtistSearchLink } from '../search/ArtistSearch'
import { trackPath } from './TrackPage'

export const ArtistPage = ({ id }) => {
  const [uris, setURIs] = useState()
  const [tracks, setTracks] = useState()
  const [artist, setArtist] = useState()

  const client = useContext(SpotifyClientContext)
  const { closeSearch } = useContext(SearchContext)
  const currentTrack = useContext(TrackContext)

  useEffect(() => {
    if (client) {
      client.get(`/artists/${id}`).then(({ data }) => setArtist(data))

      client
        .get(`/artists/${id}/top-tracks`, {
          params: {
            market: 'from_token',
          },
        })
        .then(response => {
          const { tracks } = response.data

          setTracks(tracks)
          setURIs(tracks.map(track => track.uri))
        })
    }
  }, [client, id, setArtist, setURIs])

  useEffect(() => {
    closeSearch()
    scrollToTop()
  }, [id, closeSearch])

  if (!artist) {
    return null
  }

  return (
    <>
      <Helmet>
        <title>Splayer: {artist.name}</title>
      </Helmet>

      {uris && <Player uris={uris} />}

      {tracks && (
        <Tracks>
          <div>tracks</div>

          {tracks.map(track => (
            <TrackLink
              key={track.uri}
              to={trackPath(track)}
              popularity={track.popularity}
            >
              <TrackName
                currentTrack={currentTrack && currentTrack.uri === track.uri}
              >
                {track.name}
              </TrackName>
              <Year>{dateToYear(track.album.release_date)}</Year>
            </TrackLink>
          ))}
        </Tracks>
      )}

      <ArtistAlbums artist={artist} />

      {artist.genres && (
        <Genres>
          {artist.genres.map((genre, index) => (
            <span key={index}>
              {index > 0 && ', '}
              <ArtistSearchLink query={{ genre }}>{genre}</ArtistSearchLink>
            </span>
          ))}
        </Genres>
      )}

      <RelatedArtists artist={artist} />
    </>
  )
}

const Year = styled.div`
  font-size: 14px;
  color: #777;
`

const TrackName = styled.div`
  display: flex;
  text-align: center;
  
  &::before {
    display: inline-block;
    padding-right: 8px;
    content: "${props => (props.currentTrack ? '>' : '')}";
  }
  
  &::after {
    display: inline-block;
    padding-left: 8px;
    content: "${props => (props.currentTrack ? ' <' : '')}";
  }
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

const Genres = styled.div`
  background: black;
  color: white;
  font-size: 20px;
  font-family: monospace;
  text-align: center;
  padding: 32px;
`
