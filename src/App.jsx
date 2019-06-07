import React, { useContext } from 'react'
import { Login } from './Login'
import { Auth } from './Auth'
import { SpotifyContext, SpotifyPlaybackContext } from '@aeaton/react-spotify'
import { Player } from './Player'

export const App = () => {
  const { accessToken, login, logout, error: authError } = useContext(
    SpotifyContext
  )
  const { player, error: playerError } = useContext(SpotifyPlaybackContext)

  return (
    <div style={{ fontFamily: '"New York Medium", "Roboto", sans-serif' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        {accessToken && <Auth logout={logout} />}
      </div>

      {authError && <div>{authError}</div>}
      {playerError && <div>{playerError}</div>}

      {accessToken ? (
        <>{player && <Player player={player} />}</>
      ) : (
        <Login login={login} />
      )}
    </div>
  )
}
