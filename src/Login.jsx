import { SpotifyContext } from '@aeaton/react-spotify'
import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export const Login = () => {
  const { login } = useContext(SpotifyContext)

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={login}>
        Sign in with Spotify
      </Button>
    </Container>
  )
}
