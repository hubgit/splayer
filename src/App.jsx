import React, { useContext } from 'react'
import { Login } from './Login'
import { Profile } from './Profile'
import { SpotifyContext, SpotifyPlaybackContext } from '@aeaton/react-spotify'
import { Player } from './Player'

export const App = () => {
  const { accessToken, login, logout, error: authError } = useContext(
    SpotifyContext
  )
  const { player, error: playerError } = useContext(SpotifyPlaybackContext)

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        {accessToken && <Profile logout={logout} />}
      </div>

      {authError && <div>{authError}</div>}
      {playerError && <div>{playerError}</div>}

      {accessToken ? (
        <>{player && <Player player={player} />}</>
      ) : (
        <Login login={login} />
      )}
    </>
  )
}
