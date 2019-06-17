import { SpotifyClientContext } from '@aeaton/react-spotify'
import { CancelToken } from 'axios'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { buildQuery } from '../lib'

let source

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState({})
  const [results, setResults] = useState({})

  const client = useContext(SpotifyClientContext)

  const search = useCallback(
    query => {
      if (!client) {
        throw new Error('No client yet!')
      }

      if (!query) {
        setQuery({})
        setResults({})
        return
      }

      if (source) {
        source.cancel()
      }

      source = CancelToken.source()

      console.log({ query })

      const { query: queryData, fields, type, limit } = query

      client
        .get('/search', {
          params: {
            q: buildQuery(queryData, fields),
            type,
            limit: limit || 20,
            market: 'from_token',
          },
          cancelToken: source.token,
        })
        .then(response => {
          setResults({
            ...results,
            [type]: response.data,
          })
        })
    },
    [client, results]
  )

  const openSearch = useCallback(
    query => {
      setQuery(query)
      setResults({})
      setSearchOpen(true)

      if (query) {
        search(query)
      }
    },
    [search]
  )

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
  }, [])

  const toggleSearch = useCallback(
    event => {
      event && event.preventDefault()
      setSearchOpen(value => !value)
    },
    [setSearchOpen]
  )

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        closeSearch,
        openSearch,
        toggleSearch,
        query,
        setQuery,
        search,
        results,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}