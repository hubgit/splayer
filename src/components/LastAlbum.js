import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { artistNames, dateToYear } from '../lib'
import { AlbumLink } from '../links/AlbumLink'

export const LastAlbum = React.memo(() => {
  const [album, setAlbum] = useState()

  const client = useContext(SpotifyClientContext)

  useEffect(() => {
    const id = window.localStorage.getItem('album')

    if (id) {
      client.request({
        url: `/albums/${id}`,
        params: {
          market: 'from_token',
        },
      }).then(album => {
        setAlbum(album)
      })
    }
  }, [client])

  if (!album) {
    return null
  }

  return (
    <Container>
      <AlbumLink key={album.uri} album={album}>
        <div>{album.name}</div>
        <Metadata>
          {artistNames(album.artists)}
          {' / '}
          {dateToYear(album.release_date)}
        </Metadata>
      </AlbumLink>
    </Container>
  )
})

const Container = styled.div`
  padding: 16px;
  background: #aa611d;
  color: white;
`

const Metadata = styled.div`
  font-size: 16px;
  font-family: Roboto, sans-serif;
  color: rgba(0, 0, 0, 0.25);
  margin-left: 8px;
`
