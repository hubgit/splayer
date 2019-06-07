import { HomeOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { Auth } from './Auth'
import { PlainLink } from './components'

export const Header = ({ children }) => {
  return (
    <Container>
      <div>
        <PlainLink to={'/'}>
          <HomeOutlined />
        </PlainLink>
      </div>
      <div>{children}</div>
      <div>
        <Auth />
      </div>
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px;
  background: white;
  font-family: Roboto, sans-serif;
  margin-bottom: 16px;

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
