import React, { useCallback, useContext } from 'react'
import { Button } from '@material-ui/core'
import { SpotifyContext } from '@aeaton/react-spotify'

export const Auth = () => {
  const { accessToken, login, logout } = useContext(SpotifyContext)

  const handleLogin = useCallback(() => {
    login()
  }, [login])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: accessToken ? 'flex-end' : 'center',
        alignItems: 'center',
        height: accessToken ? 'auto' : 400,
      }}
    >
      {accessToken ? (
        <Button onClick={logout}>Sign out</Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Sign in with Spotify
        </Button>
      )}
    </div>
  )
}
