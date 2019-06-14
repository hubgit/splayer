import React from 'react'
import styled from 'styled-components'
import { PopularityLink } from '../components/Links'
import { uriToID } from '../lib'

export const TrackLink = ({ track, children }) => (
  <Link to={`/tracks/${uriToID(track.uri)}`} popularity={track.popularity}>
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
