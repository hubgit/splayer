import React, { useContext } from 'react'
import styled from 'styled-components'
import { ColorContext } from '../providers/ColorProvider'
import { SearchButton } from '../search/SearchButton'
import { Auth } from './Auth'
import { Controls } from './Controls'
import { HomeButton } from './HomeButton'
import { SaveButton } from './SaveButton'

export const Footer = () => {
  const { backgroundColor } = useContext(ColorContext)

  return (
    <Container backgroundColor={backgroundColor}>
      <div>
        <SearchButton />
        <HomeButton />
        <SaveButton />
      </div>
      <Controls />
      <div>
        <Auth />
      </div>
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 16px;
  z-index: 1;
  background-image: ${props =>
    `linear-gradient(${
      props.backgroundColor
    } 0%, rgba(255,255,255,0.35) 100%)`};

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
