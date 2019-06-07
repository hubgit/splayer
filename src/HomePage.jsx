import { SpotifyPlaybackContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect } from 'react'
import { AlbumSearch } from './AlbumSearch'
import { ArtistSearch } from './ArtistSearch'
import { Header } from './Header'

export const HomePage = () => {
  const { player } = useContext(SpotifyPlaybackContext)

  useEffect(() => {
    document.body.background = 'white'
  }, [])

  useEffect(() => {
    if (player) {
      player.pause()
    }
  }, [player])

  return (
    <>
      <Header />
      <ArtistSearch />
      <AlbumSearch />
    </>
  )
}
