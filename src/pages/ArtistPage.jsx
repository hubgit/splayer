import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ArtistAlbums } from '../components/ArtistAlbums'
import { PopularityLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { dateToYear, scrollToTop, uriToID } from '../lib'
import { SearchContext } from '../providers/SearchProvider'
import { TrackContext } from '../providers/TrackProvider'
import { ArtistSearchLink } from '../search/ArtistSearch'
import { trackPath } from './TrackPage'

export const artistPath = artist => `/artists/${uriToID(artist.uri)}`

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
      {uris && <Player uris={uris} />}

      {tracks && (
        <Tracks>
          {tracks.map(track => (
            <TrackLink
              key={track.uri}
              to={trackPath(track)}
              popularity={track.popularity}
              currentTrack={currentTrack && currentTrack.uri === track.uri}
            >
              <div>{track.name}</div>
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
