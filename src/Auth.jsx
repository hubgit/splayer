import { Button } from '@material-ui/core'
import React from 'react'

export const Auth = ({ logout }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Button onClick={logout}>Sign out</Button>
  </div>
)
