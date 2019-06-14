import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ArtistAlbums } from '../components/ArtistAlbums'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { scrollToTop, uriToID } from '../lib'
import { SearchContext } from '../providers/SearchProvider'
import { ArtistSearchLink } from '../search/ArtistSearch'

export const artistPath = artist => `/artists/${uriToID(artist.uri)}`

export const ArtistPage = ({ id }) => {
  const [uris, setURIs] = useState()
  const [artist, setArtist] = useState()

  const client = useContext(SpotifyClientContext)
  const { closeSearch } = useContext(SearchContext)

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
          setURIs(response.data.tracks.map(track => track.uri))
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

const Genres = styled.div`
  background: black;
  color: white;
  font-size: 20px;
  font-family: monospace;
  text-align: center;
  padding: 32px;
`
