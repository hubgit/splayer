import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { ArtistAlbums } from '../components/ArtistAlbums'
import { ArtistTracks } from '../components/ArtistTracks'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { scrollToTop } from '../lib'
import { SearchContext } from '../providers/SearchProvider'
import { TrackContext } from '../providers/TrackProvider'
import { ArtistSearchLink } from '../search/ArtistSearch'

export const ArtistPage = ({ id }) => {
  const [uris, setURIs] = useState()
  const [tracks, setTracks] = useState()
  const [artist, setArtist] = useState()

  const client = useContext(SpotifyClientContext)
  const { closeSearch } = useContext(SearchContext)
  const currentTrack = useContext(TrackContext)

  useEffect(() => {
    client.request({
        url: `/artists/${id}`,
      }).then(data => setArtist(data))

    client.request({
        url: `/artists/${id}/top-tracks`,
        params: {
          market: 'from_token',
        },
      }).then(({ tracks }) => {
        setTracks(tracks)
        setURIs(tracks.map(track => track.uri))
      })
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

      <Artist>{artist.name}</Artist>

      {uris && <Player uris={uris} autoplay={false} />}

      <ArtistAlbums artist={artist} />

      <ArtistTracks tracks={tracks} currentTrack={currentTrack} />

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

const Artist = styled.div`
  text-align: center;
  font-size: 32px;
  padding: 48px;
`

const Genres = styled.div`
  background: black;
  color: white;
  font-size: 20px;
  font-family: monospace;
  text-align: center;
  padding: 32px;
`
