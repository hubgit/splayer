import React from 'react'
import { Button } from '@material-ui/core'

export const Auth = ({ login }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 400,
    }}
  >
    <Button variant="contained" color="primary" onClick={() => login()}>
      Sign in with Spotify
    </Button>
  </div>
)
