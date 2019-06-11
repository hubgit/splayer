import React, { useContext } from 'react'
import styled from 'styled-components'
import { ColorContext } from '../providers/ColorProvider'
import { Auth } from './Auth'
import { Controls } from './Controls'
import { PlainLink } from './Links'

export const Footer = () => {
  const { backgroundColor } = useContext(ColorContext)

  const { search } = window.location

  return (
    <Container style={{ backgroundColor }}>
      <div>
        <NavLink to={`/artists${search}`}>ARTISTS</NavLink>
        <NavLink to={`/albums${search}`}>ALBUMS</NavLink>
        <NavLink to={`/tracks${search}`}>TRACKS</NavLink>
      </div>
      <Controls />
      <div>
        <Auth />
      </div>
    </Container>
  )
}

const NavLink = styled(PlainLink)`
  display: inline-flex;
  margin: 0 8px;
  font-family: Roboto, sans-serif;
  font-weight: 200;

  &:hover {
    text-decoration: none;
    color: white;
  }
`

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
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
