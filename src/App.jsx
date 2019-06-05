import React, { useContext } from 'react'
import { Auth } from './Auth'
import { Search } from './Search'
import { SpotifyContext, SpotifyPlaybackContext } from '@aeaton/react-spotify'

import { State } from './State'

export const App = () => {
  const { error: authError } = useContext(SpotifyContext)
  const { player, error: playerError } = useContext(SpotifyPlaybackContext)

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {player ? <Search player={player} /> : <div />}
        <Auth />
      </div>

      {authError && <div>{authError}</div>}
      {playerError && <div>{playerError}</div>}

      {player && <State player={player} />}
    </>
  )
}
