import React from 'react'
import { PopularityLink } from '../components/Links'
import { uriToID } from '../lib'

export const ArtistLink = ({ artist, children, className }) => (
  <PopularityLink
    to={`/artists/${uriToID(artist.uri)}`}
    popularity={artist.popularity}
    className={className}
  >
    {children}
  </PopularityLink>
)
