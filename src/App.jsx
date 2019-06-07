import { SpotifyContext, SpotifyPlaybackContext } from '@aeaton/react-spotify'
import { Router } from '@reach/router'
import React, { useContext } from 'react'
import { AlbumPage } from './AlbumPage'
import { ArtistPage } from './ArtistPage'
import { HomePage } from './HomePage'
import { Login } from './Login'

export const App = () => {
  const { accessToken, error: authError } = useContext(SpotifyContext)
  const { error: playerError } = useContext(SpotifyPlaybackContext)

  if (!accessToken) {
    return <Login />
  }

  return (
    <>
      {authError && <div>{authError}</div>}
      {playerError && <div>{playerError}</div>}

      <Router>
        <HomePage path={'/'} />
        <ArtistPage path={'/artists/:id'} />
        <AlbumPage path={'/albums/:id'} />
        {/*<TrackPage path={'/tracks/:id'} />*/}
      </Router>
    </>
  )
}
