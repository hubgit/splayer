import { SpotifyPlaybackProvider, SpotifyProvider } from '@aeaton/react-spotify'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { ColorProvider } from './providers/ColorProvider'

ReactDOM.render(
  <SpotifyProvider
    clientID={'00e31e7317d64ebe88d970a469de42d7'}
    redirectURI={window.location.origin}
    scopes={['streaming', 'user-read-private']}
  >
    <SpotifyPlaybackProvider deviceName={'splayer'}>
      <ColorProvider>
        <App />
      </ColorProvider>
    </SpotifyPlaybackProvider>
  </SpotifyProvider>,
  document.getElementById('root')
)
