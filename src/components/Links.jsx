import { Link } from '@reach/router'
import styled from 'styled-components'

export const PlainLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`

export const PopularityLink = styled(PlainLink)`
  font-size: ${props => Math.max(props.popularity, 10)}px;
`
