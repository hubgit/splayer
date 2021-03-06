// import { SpotifyPlaybackContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect } from 'react'
import { LastAlbum } from '../components/LastAlbum'
import { UserAlbums } from '../components/UserAlbums'
import {
  ColorContext,
  DEFAULT_BACKGROUND_COLOR,
} from '../providers/ColorProvider'

export const HomePage = () => {
  // const { player } = useContext(SpotifyPlaybackContext)

  const { setBackgroundColor } = useContext(ColorContext)

  useEffect(() => {
    setBackgroundColor(DEFAULT_BACKGROUND_COLOR)
  }, [setBackgroundColor])

  /*  useEffect(() => {
    if (player) {
      player.pause()
    }
  }, [player])*/

  return (
    <>
      <LastAlbum />
      <UserAlbums />
    </>
  )
}
