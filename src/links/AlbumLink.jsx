import React from 'react'
import styled from 'styled-components'
import { PopularityLink } from '../components/Links'
import { uriToID } from '../lib'

export const AlbumLink = ({ album, children }) => (
  <Link to={`/albums/${uriToID(album.uri)}`} popularity={album.popularity}>
    {children}
  </Link>
)

const Link = styled(PopularityLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 8px;
`
