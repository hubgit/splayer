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
      <div>
        <SearchButton />
      </div>
      <Controls />

      <Account />
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 16px;
  margin-top: 4px;
  z-index: 1;

  > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div:first-child {
    justify-content: flex-start;
  }

  > div:last-child {
    justify-content: flex-end;
  }
`
