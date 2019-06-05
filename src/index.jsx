import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { SpotifyPlaybackProvider, SpotifyProvider } from '@aeaton/react-spotify'

ReactDOM.render(
  <SpotifyProvider
    clientID={'00e31e7317d64ebe88d970a469de42d7'}
    scope={'streaming'}
  >
    <SpotifyPlaybackProvider deviceName={'splayer'}>
      <App />
    </SpotifyPlaybackProvider>
  </SpotifyProvider>,
  document.getElementById('root')
)
