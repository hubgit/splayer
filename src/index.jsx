import { SpotifyPlaybackProvider, SpotifyProvider } from '@aeaton/react-spotify'
import React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { ColorProvider } from './providers/ColorProvider'
import { SearchProvider } from './providers/SearchProvider'

render(
  <SpotifyProvider
    clientID={'00e31e7317d64ebe88d970a469de42d7'}
    redirectURI={window.location.origin}
    scopes={[
      'streaming',
      'user-read-private',
      'user-library-read',
      'user-library-modify',
    ]}
  >
    <SpotifyPlaybackProvider deviceName={'splayer'}>
      <ColorProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </ColorProvider>
    </SpotifyPlaybackProvider>
  </SpotifyProvider>,
  document.getElementById('root')
)
