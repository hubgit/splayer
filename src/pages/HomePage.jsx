import { SpotifyPlaybackContext } from '@aeaton/react-spotify'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { PlainLink } from '../components/Links'

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
      <HomeLink to={'/artists'}>Artists</HomeLink>
      <HomeLink to={'/albums'}>Albums</HomeLink>
      <HomeLink to={'/tracks'}>Tracks</HomeLink>
    </>
  )
}

const HomeLink = styled(PlainLink)`
  display: block;
  text-align: center;
  font-size: 32px;
  padding: 8px;
  margin: 16px;
`
