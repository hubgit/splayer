import React, { useContext } from 'react'
import styled from 'styled-components'
import { ColorContext } from '../providers/ColorProvider'
import { SearchButton } from '../search/SearchButton'
import { Account } from './Account'
import { Controls } from './Controls'

export const Footer = () => {
  const { backgroundColor } = useContext(ColorContext)

  return (
    <Container
      style={{
        borderTopWidth: 10,
        borderTopStyle: 'solid',
        borderTopColor: backgroundColor,
      }}
    >
      <SearchButton />

      <Controls />

      <Account />
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-top: 4px;
  z-index: 1;

  > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
