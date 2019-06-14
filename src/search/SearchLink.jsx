import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { SearchContext } from '../providers/SearchProvider'

export const SearchLink = ({
  children,
  popularity,
  query,
  fields,
  type,
  limit,
}) => {
  const { openSearch } = useContext(SearchContext)

  const handleClick = useCallback(() => {
    openSearch({ query, fields, type, limit })
  }, [fields, limit, openSearch, query, type])

  return (
    <Container onClick={handleClick} popularity={popularity}>
      {children}
    </Container>
  )
}

const Container = styled.div`
  font-size: ${props => Math.max(props.popularity, 10)}px;
  color: inherit;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
