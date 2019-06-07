import { SpotifyPlaybackProvider, SpotifyProvider } from '@aeaton/react-spotify'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

ReactDOM.render(
  <SpotifyProvider
    clientID={'00e31e7317d64ebe88d970a469de42d7'}
    redirectURI={window.location.origin}
    scope={'streaming'}
  >
    <SpotifyPlaybackProvider deviceName={'splayer'}>
      <App />
    </SpotifyPlaybackProvider>
  </SpotifyProvider>,
  document.getElementById('root')
)
