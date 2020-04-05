import React, { useContext, useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import TilesContainer from './components/TilesContainer'
import AuthorizeButton from './components/AuthorizeButton'
import { Store } from './state/Stores'
import { fetchData } from './state/Actions'
import qs from 'query-string'
import Player from './components/Player'

const StyledApp = styled.div`
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function App () {
  const { state, dispatch } = useContext(Store)
  const history = useHistory()

  useEffect(() => {
    // No data has been fetched, yet
    if (state.tracks.length === 0) {
      const storageToken = window.localStorage.getItem('token')
      const storageExpirationTimestampSeconds = window.localStorage.getItem('expirationTimestampSeconds')
      const nowTimeStampSeconds = Math.floor(Date.now() / 1000)
      const tokenIsNotExpired = (storageExpirationTimestampSeconds - nowTimeStampSeconds) > 0
      if (storageToken && storageExpirationTimestampSeconds && tokenIsNotExpired) {
        dispatch(fetchData('playlists/37i9dQZF1DX4o1oenSJRJd', storageToken))
      }
    }
  }, [dispatch, state])

  return (
    <>
      <Route
        path='/callback'
        render={() => {
          const { access_token: token, expires_in: expiration } = qs.parse(window.location.hash)
          history.push('/')
          const nowSeconds = Math.floor(Date.now() / 1000)
          window.localStorage.setItem('token', token)
          window.localStorage.setItem('expirationTimestampSeconds', Number(nowSeconds) + Number(expiration))
        }}
      />
      <StyledApp>
        <h1>Music Memory</h1>
        <AuthorizeButton />
        {state.tracks.length !== 0 &&
          <h2>Moves: {Math.floor(state.moveCounter / 2)} – Pairs: {state.pairCounter}</h2>}
        <TilesContainer count={state.tiles} />
        {Boolean(state.tracks.length) && <Player />}
      </StyledApp>
    </>
  )
}
