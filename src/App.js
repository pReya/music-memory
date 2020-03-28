import React, { useContext, useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import TilesContainer from './components/TilesContainer'
import AuthorizeButton from './components/AuthorizeButton'
import { store } from './state/Stores'
import { setApiToken, fetchData } from './state/Actions'
import qs from 'query-string'

const StyledApp = styled.div`
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function App () {
  const { state, dispatch } = useContext(store)
  const history = useHistory()

  useEffect(() => {
    if (state.apiToken && state.tracks.length === 0) {
      dispatch(fetchData('playlists/0D5oNpkqZxdmklYvWwDKYI', state.apiToken))
    }
  }, [dispatch, state])

  return (
    <>
      <Route
        path='/callback'
        render={() => {
          const token = qs.parse(window.location.hash).access_token
          history.push('/')
          dispatch(setApiToken(token))
        }}
      />
      <StyledApp>
        <h1>Music Memory</h1>
        <AuthorizeButton />

        <TilesContainer count={state.tiles} />
      </StyledApp>
    </>
  )
}
