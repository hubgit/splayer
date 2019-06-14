import { SpotifyStateContext } from '@aeaton/react-spotify'
import React, { createContext, useContext, useEffect, useState } from 'react'

export const TrackContext = createContext()

export const TrackProvider = ({ children }) => {
  const [track, setTrack] = useState()

  const state = useContext(SpotifyStateContext)

  useEffect(() => {
    setTrack(state ? state.track_window.current_track : undefined)
  }, [state])

  return <TrackContext.Provider value={track}>{children}</TrackContext.Provider>
}
