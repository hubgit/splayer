import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { artistNames, dateToYear } from '../lib'
import { AlbumLink } from '../links/AlbumLink'

export const UserAlbums = () => {
  const client = useContext(SpotifyClientContext)

  const [albums, setAlbums] = useState()

  useEffect(() => {
    if (client) {
      client
        .get(`/me/albums`, {
          params: {
            market: 'from_token',
            limit: 50, // TODO: pagination
          },
        })
        .then(response => {
          setAlbums(response.data.items.map(item => item.album))
        })
    }
  }, [client, setAlbums])

  if (!albums) {
    return null
  }

  return (
    <Container>
      {albums.map(album => (
        <AlbumLink key={album.uri} album={album}>
          <div>{album.name}</div>
          <Metadata>
            {artistNames(album.artists)}
            {' / '}
            {dateToYear(album.release_date)}
          </Metadata>
        </AlbumLink>
      ))}
    </Container>
  )
}

const Metadata = styled.div`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.25);
  margin-left: 8px;
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
