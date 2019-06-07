import { useSpotifyClient } from '@aeaton/react-spotify'
import { Button, TextField } from '@material-ui/core'
import { CancelToken } from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const ucfirst = text => text.substring(0, 1).toUpperCase() + text.substring(1)

let source

export const Search = ({ fields, type, handleData }) => {
  const client = useSpotifyClient()

  const [query, setQuery] = useState()

  useEffect(() => {
    setQuery({})
  }, [setQuery])

  const reset = useCallback(() => {
    setQuery({})
  }, [setQuery])

  const submit = useCallback(
    event => {
      event.preventDefault()

      const q = Object.keys(query)
        .filter(key => query[key])
        .map(key => `${key}:"${query[key]}"`)
        .join(' ')

      if (source) {
        source.cancel()
      }

      source = CancelToken.source()

      client
        .get('/search', {
          params: { q, type },
          cancelToken: source.token,
        })
        .then(response => {
          handleData(response.data)
        })
    },
    [client, handleData, query, type]
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
    <Form onSubmit={submit} onReset={reset}>
      {fields.map(field => (
        <TextField
          key={field}
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
  )
}

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
