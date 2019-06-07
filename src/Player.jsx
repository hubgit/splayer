import React, { useCallback, useEffect, useState } from 'react'
import { IconButton } from '@material-ui/core'
import {
  PlayCircleFilled,
  PauseCircleFilled,
  SkipNext,
  SkipPrevious,
} from '@material-ui/icons'
import { Album } from './Album'
import { Artist } from './Artist'
import { Image } from './Image'
import { RelatedArtists } from './RelatedArtists'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import { Search } from './Search'
import 'react-accessible-accordion/dist/fancy-example.css'
import { Track } from './Track'

export const Player = ({ player }) => {
  const [state, setState] = useState()

  useEffect(() => {
    player.addListener('player_state_changed', state => {
      setState(state)
    })
  }, [player])

  const togglePlay = useCallback(() => {
    player.togglePlay()
  }, [player])

  const nextTrack = useCallback(() => {
    player.nextTrack()
  }, [player])

  const previousTrack = useCallback(() => {
    player.previousTrack()
  }, [player])

  const track = state ? state.track_window.current_track : undefined

  return (
    <>
      <div
        style={{ flex: 1, display: 'flex', height: '100vh', overflow: 'auto' }}
      >
        <div style={{ width: '60%' }}>
          {state && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 16,
              }}
            >
              <IconButton
                onClick={previousTrack}
                disabled={state.disallows.skipping_prev}
              >
                <SkipPrevious />
              </IconButton>

              <IconButton onClick={togglePlay}>
                {state.paused ? <PlayCircleFilled /> : <PauseCircleFilled />}
              </IconButton>

              <IconButton
                onClick={nextTrack}
                disabled={state.disallows.skipping_next}
              >
                <SkipNext />
              </IconButton>
            </div>
          )}

          {track && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 16,
                }}
              >
                <a
                  href={track.uri}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    fontSize: 32,
                    textAlign: 'center',
                  }}
                >
                  {track.name}
                </a>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: 16,
                }}
              >
                {track.artists.map(artist => (
                  <div key={artist.uri}>
                    <a
                      href={artist.uri}
                      key={artist.uri}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        fontSize: 20,
                      }}
                    >
                      {artist.name}
                    </a>
                  </div>
                ))}
              </div>

              {track.album && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 32,
                  }}
                >
                  <Image album={track.album} paused={state.paused} />
                </div>
              )}
            </>
          )}
        </div>

        <Accordion
          style={{ width: '40%' }}
          allowZeroExpanded={true}
          preExpanded={['search']}
        >
          <AccordionItem uuid={'search'}>
            <AccordionItemHeading>
              <AccordionItemButton style={{ boxSizing: 'border-box' }}>
                Search
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Search player={player} />
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton style={{ boxSizing: 'border-box' }}>
                Artist
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {track && track.artists && <Artist artist={track.artists[0]} />}
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton style={{ boxSizing: 'border-box' }}>
                Album
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {track && track.album && <Album album={track.album} />}
            </AccordionItemPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton style={{ boxSizing: 'border-box' }}>
                Track
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {track && <Track track={track} />}
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>

      {track && track.artists && <RelatedArtists artist={track.artists[0]} />}
    </>
  )
}
