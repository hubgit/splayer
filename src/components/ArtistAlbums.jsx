import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { dateToYear, uriToID } from '../lib'
import { AlbumLink } from '../links/AlbumLink'

// TODO: sum popularities
const filterAlbums = albums =>
  albums.filter(
    album =>
      !albums.find(
        a => a.name === album.name && a.popularity > album.popularity
      )
  )

export const ArtistAlbums = ({ artist, isPopover }) => {
  const client = useContext(SpotifyClientContext)

  const [albums, setAlbums] = useState()

  useEffect(() => {
    if (client) {
      client
        .get(`/artists/${uriToID(artist.uri)}/albums`, {
          params: {
            include_groups: 'album',
            market: 'from_token',
            limit: 50, // TODO: pagination
          },
        })
        .then(response => {
          client
            .get('/albums/', {
              params: {
                ids: response.data.items
                  .filter(item => item.album_type === 'album')
                  .slice(0, 20)
                  .map(item => uriToID(item.uri))
                  .join(','),
              },
            })
            .then(response => {
              setAlbums(filterAlbums(response.data.albums))
            })
        })
    }
  }, [artist, client, setAlbums])

  if (!albums) {
    return null
  }

  return (
    <Container isPopover={isPopover}>
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
