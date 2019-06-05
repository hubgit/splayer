import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import { Auth } from './Auth'
import { Search } from './Search'
import { SpotifyContext, SpotifyPlaybackContext } from '@aeaton/react-spotify'

import { State } from './State'

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
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        {player ? <Search player={player} /> : <div />}

        {accessToken && <Button onClick={logout}>Sign out</Button>}
      </div>

      {authError && <div>{authError}</div>}
      {playerError && <div>{playerError}</div>}

      {accessToken ? (
        <>{player && <State player={player} />}</>
      ) : (
        <Auth login={login} />
      )}
    </>
  )
}
