import { Button, TextField } from '@material-ui/core'
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { SearchContext } from '../providers/SearchProvider'

const ucfirst = text => text.substring(0, 1).toUpperCase() + text.substring(1)

export const SearchForm = React.memo(({ fields, type, limit }) => {
  const { search, query: queryData, setQuery } = useContext(SearchContext)

  const { query = {} } = queryData

  const reset = useCallback(() => {
    search(null)
  }, [search])

  const submit = useCallback(
    event => {
      event.preventDefault()
      search(queryData)
    },
    [queryData, search]
  )

  const handleChange = useCallback(
    field => event => {
      setQuery({
        fields,
        type,
        limit,
        query: {
          ...query,
          [field]: event.target.value,
        },
      })
    },
    [fields, limit, query, setQuery, type]
  )

  return (
    <Form onSubmit={submit} onReset={reset}>
      <div>
        {fields.map((field, index) => (
          <TextField
            key={field}
            autoFocus={index === 0}
            label={ucfirst(field)}
            value={query[field] || ''}
            onChange={handleChange(field)}
            type={field === 'year' ? 'number' : 'text'}
          />
        ))}
      </div>

      <Actions>
        <Button color={'primary'} variant={'contained'} type={'submit'}>
          Search
        </Button>

        <Button type={'reset'}>Reset</Button>
      </Actions>
    </Form>
  )
})

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px;

  > div > div {
    margin: 16px;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
`
