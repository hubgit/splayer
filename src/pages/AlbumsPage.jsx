import { SpotifyClientContext } from '@aeaton/react-spotify'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { PopularityLink } from '../components/Links'
import { Search } from '../components/Search'
import { dateToYear, scrollToTop, uriToID } from '../lib'
import { albumPath } from './AlbumPage'

const Heading = styled.div`
  font-size: 30px;
  text-align: center;
  margin: 16px;
`

const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Result = styled(PopularityLink)`
  text-align: center;
  margin: 8px;
  display: block;
`

const Artist = styled.div`
  color: #777;
  font-size: 16px;
`

const fields = ['album', 'artist', 'label', 'year']

export const AlbumsPage = ({ location }) => {
  const [items, setItems] = useState()

  const client = useContext(SpotifyClientContext)

  const handleData = useCallback(
    data => {
      const ids = data.albums.items
        .filter(item => item.album_type === 'album')
        .slice(0, 20)
        .map(item => uriToID(item.uri))
        .join(',')

      client
        .get('/albums', {
          params: {
            ids,
          },
        })
        .then(response => setItems(response.data.albums))
    },
    [client]
  )

  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <>
      <Heading>Albums</Heading>

      <Search
        location={location}
        fields={fields}
        type={'album'}
        handleData={handleData}
        route={'/albums'}
        limit={50}
      />

      {items && (
        <Results>
          {items.map(album => (
            <Result
              key={album.uri}
              to={albumPath(album)}
              popularity={album.popularity}
            >
              <div>{album.name}</div>

              <Artist>
                {album.artists.map(artist => artist.name).join(', ')}
                <span> / </span>
                {album.release_date && dateToYear(album.release_date)}
              </Artist>
            </Result>
          ))}
        </Results>
      )}
    </>
  )
}
