import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchAlbums } from '../api'
import { dateToYear, uriToID } from '../lib'
import { AlbumLink } from '../links/AlbumLink'

const fetchArtistAlbums = async (artist, client, setAlbums) => {
  const albums = []

  let response = await client.get(`/artists/${uriToID(artist.uri)}/albums`, {
    params: {
      include_groups: 'album',
      market: 'from_token',
      limit: 50,
    },
  })

  albums.push(...response.data.items)

  while (response.data.next) {
    response = await client.get(response.data.next)
    albums.push(...response.data.items)
  }

  fetchAlbums(albums, client, setAlbums)
}

export const ArtistAlbums = ({ artist, isPopover }) => {
  const client = useContext(SpotifyClientContext)

  const [albums, setAlbums] = useState()

  useEffect(() => {
    if (client) {
      fetchArtistAlbums(artist, client, setAlbums)
    }
  }, [artist, client, setAlbums])

  if (!albums) {
    return null
  }

  return (
    <Container isPopover={isPopover}>
      <div>albums</div>
      {albums.map(album => (
        <AlbumLink key={album.uri} album={album}>
          <span>{album.name}</span>{' '}
          <Year>{dateToYear(album.release_date)}</Year>
        </AlbumLink>
      ))}
    </Container>
  )
}

const Year = styled.span`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.25);
  margin-left: 8px;

  &:hover {
    text-decoration: none;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  min-height: ${props => (props.isPopover ? '0' : '100vh')};
`
