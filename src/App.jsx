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

export const App = () => {
  const { accessToken, error: authError } = useContext(SpotifyContext)
  // const { profile } = useContext(SpotifyProfileContext)
  const { error: playerError } = useContext(SpotifyPlaybackContext)

  if (!accessToken) {
    return <Login />
  }

  return (
    <Container>
      <Main>
        {authError && <div>{authError}</div>}
        {playerError && <div>{playerError}</div>}

        <Router>
          <HomePage path={'/'} />
          <ArtistPage path={'/artists/:id'} />
          <AlbumPage path={'/albums/:id'} />
          <TrackPage path={'/tracks/:id'} />
        </Router>
      </Main>

      <Footer />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
`
