import { SpotifyClientContext } from '@aeaton/react-spotify'
import { Button, TextField } from '@material-ui/core'
import { navigate } from '@reach/router'
import { CancelToken } from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

const ucfirst = text => text.substring(0, 1).toUpperCase() + text.substring(1)

let source

export const Search = React.memo(
  ({ location, fields, type, limit, handleData, route }) => {
    const [query, setQuery] = useState({})

    const client = useContext(SpotifyClientContext)

    useEffect(() => {
      if (!client) {
        return
      }

      const search = location.search.substring(1)

      if (search) {
        const params = new window.URLSearchParams(search)

        const query = {}
        for (const [key, value] of params.entries()) {
          query[key] = value
        }
        setQuery(query)

        const q = fields
          .filter(field => params.get(field))
          .map(field =>
            field === 'year'
              ? `${field}:${params.get(field)}`
              : `${field}:"${params.get(field)}"`
          )
          .join(' ')

        if (source) {
          source.cancel()
        }

        source = CancelToken.source()

        client
          .get('/search', {
            params: {
              q,
              type,
              limit: limit || 20,
              market: 'from_token',
            },
            cancelToken: source.token,
          })
          .then(response => {
            handleData(response.data)
          })
      }
    }, [location, client, fields, handleData, setQuery, type, limit])

    const reset = useCallback(() => {
      setQuery({})
    }, [setQuery])

    const submit = useCallback(
      event => {
        event.preventDefault()

        const params = new window.URLSearchParams(query)

        navigate(`${route}?${params.toString()}`)
      },
      [query, route]
    )

    const handleChange = useCallback(
      field => event => {
        setQuery({
          ...query,
          [field]: event.target.value,
        })
      },
      [query, setQuery]
    )

    if (!query) {
      return null
    }

    return (
      <div>
        <Form onSubmit={submit} onReset={reset}>
          {fields.map((field, index) => (
            <TextField
              key={field}
              autoFocus={index === 0}
              label={ucfirst(field)}
              value={query[field] || ''}
              onChange={handleChange(field)}
            />
          ))}

          <Actions>
            <Button color={'primary'} type={'submit'}>
              Search
            </Button>

            <Button type={'reset'}>Reset</Button>
          </Actions>
        </Form>
      </div>
    )
  }
)

const Form = styled.form`
  display: grid;
  grid-gap: 16px;
  grid-auto-flow: row;
  margin: 16px;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
