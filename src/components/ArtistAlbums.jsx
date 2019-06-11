import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { dateToYear, uriToID } from '../lib'
import { albumPath } from '../pages/AlbumPage'
import { PopularityLink } from './Links'

const filterAlbums = albums =>
  albums.filter(
    album =>
      !albums.find(
        a => a.name === album.name && a.popularity > album.popularity
      )
  )

export const ArtistAlbums = ({ artist }) => {
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
        .then(({ data: { items } }) => {
          client
            .get('/albums/', {
              params: {
                ids: items
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
    <Container>
      {albums.map(album => (
        <AlbumLink
          key={album.uri}
          to={albumPath(album)}
          popularity={album.popularity}
        >
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

const AlbumLink = styled(PopularityLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  min-height: 100vh;
`
