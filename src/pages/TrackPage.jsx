import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { PlainLink } from '../components/Links'
import { Player } from '../components/Player'
import { RelatedArtists } from '../components/RelatedArtists'
import { artistNames, scrollToTop, uriToID } from '../lib'
import { AlbumLink } from '../links/AlbumLink'
import { SearchContext } from '../providers/SearchProvider'

export const trackPath = track => `/tracks/${uriToID(track.uri)}`

const buildTitle = track =>
  [artistNames(track.artists), track.album.name, track.name].join(' / ')

export const TrackPage = React.memo(({ id }) => {
  const [track, setTrack] = useState()
  const [uris, setURIs] = useState()

  const client = useContext(SpotifyClientContext)
  const { closeSearch } = useContext(SearchContext)

  useEffect(() => {
    client
      .request({
        url: `/tracks/${id}`,
        params: {
          market: 'from_token',
        },
      })
      .then(data => {
        setTrack(data)
        setURIs([data.uri])
      })
  }, [client, id])

  useEffect(() => {
    closeSearch()
    scrollToTop()
  }, [id, closeSearch])

  if (!track) {
    return null
  }

  return (
    <>
      <Helmet>
        <title>Splayer: {buildTitle(track)}</title>
      </Helmet>

      <Player uris={uris} />

      {track.album && (
        <AlbumContainer>
          <AlbumLink album={track.album} popularity={32}>
            {track.album.name}
          </AlbumLink>
        </AlbumContainer>
      )}

      <RelatedArtists artist={track.artists[0]} />

      {track.label && (
        <LabelLink to={`/albums/?label=${track.label}`}>
          {track.label}
        </LabelLink>
      )}
    </>
  )
})

const AlbumContainer = styled.div`
  padding: 32px;
`

const LabelLink = styled(PlainLink)`
  font-size: 32px;
  text-align: center;
  display: flex;
  padding: 32px;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`
