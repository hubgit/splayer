import { useSpotifyClient } from '@aeaton/react-spotify'
import React, { useEffect, useState } from 'react'
import { PlainLink } from './components'
import { Cover } from './Cover'
import { uriToID } from './lib'
import styled from 'styled-components'

export const Albums = ({ artist }) => {
  const client = useSpotifyClient()

  const [albums, setAlbums] = useState()

  useEffect(() => {
    if (client) {
      client
        .get(`/artists/${uriToID(artist.uri)}/albums`, {
          include_groups: 'album',
          country: 'GB', // TODO: profile country
          limit: 50, // TODO: pagination
        })
        .then(({ data: { items } }) => {
          // TODO: sort by release date
          setAlbums(items)
        })
    }
  }, [artist, client, setAlbums])

  if (!albums) {
    return null
  }

  return (
    <Container>
      {albums.map(album => (
        <PlainLink to={`/albums/${uriToID(album.uri)}`}>
          <Cover album={album} />
        </PlainLink>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 16px;
  background: white;

  img {
    display: inline-block;
    margin: 16px;
  }
`
