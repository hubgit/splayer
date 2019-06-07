import { SpotifyProfileContext } from '@aeaton/react-spotify'
import { Button } from '@material-ui/core'
import React, { useContext } from 'react'

export const Profile = ({ logout }) => {
  const profile = useContext(SpotifyProfileContext)

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {profile && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginRight: 8,
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          {profile.display_name}
        </span>
      )}
      <Button onClick={logout}>Sign out</Button>
    </div>
  )
}
