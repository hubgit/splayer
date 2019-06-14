import { SpotifyContext, SpotifyPlaybackContext } from '@aeaton/react-spotify'
import { Router } from '@reach/router'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { Footer } from './components/Footer'
import { Login } from './components/Login'
import { AlbumPage } from './pages/AlbumPage'
import { ArtistPage } from './pages/ArtistPage'
import { HomePage } from './pages/HomePage'
import { TrackPage } from './pages/TrackPage'
import { ColorContext } from './providers/ColorProvider'

export const App = () => {
  const { accessToken, error: authError } = useContext(SpotifyContext)
  // const { profile } = useContext(SpotifyProfileContext)
  const { error: playerError } = useContext(SpotifyPlaybackContext)

  const { backgroundColor } = useContext(ColorContext)

  if (!accessToken) {
    return <Login />
  }

  return (
    <Container style={{ backgroundColor }}>
      {authError && <div>{authError}</div>}
      {playerError && <div>{playerError}</div>}

      <Router>
        <HomePage path={'/'} />
        <ArtistPage path={'/artists/:id'} />
        <AlbumPage path={'/albums/:id'} />
        <TrackPage path={'/tracks/:id'} />
      </Router>

      <Footer />
    </Container>
  )
}

const Container = styled.div`
  padding-top: 32px;
  padding-bottom: 48px;
  min-height: 100vh;
`
