import { SpotifyClientContext } from '@aeaton/react-spotify'
import { Button } from '@material-ui/core'
import React, { useCallback, useContext, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export const Login = () => {
  const [error, setError] = useState()

  const client = useContext(SpotifyClientContext)

  const handleLogin = useCallback(() => {
    client.login().catch(error => {
      setError(error)
    })
  }, [client])

  return (
    <Container>
      {error && <div>{error.message}</div>}
      <Button onClick={handleLogin}>Sign in with Spotify</Button>
    </Container>
  )
}
