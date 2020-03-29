import React, { createContext } from 'react'
import { actionTypes } from './Actions'
import { createReducer } from 'react-use'
import thunk from 'redux-thunk'

const initialState = {
  apiToken: '',
  apiExpiration: 0,
  tracks: [],
  tiles: 9,
  isPlaying: false,
  playerRef: null,
  lastSelectedTile: null
}

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
    timestamp: false,
    diff: true
  })
  middlewares.push(logger)
}

const useThunkReducer = createReducer(...middlewares)

export const Store = createContext(initialState)

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useThunkReducer((state, action) => {
    switch (action.type) {
      case actionTypes.SET_API_INFO: {
        return { ...state, apiToken: action.token, apiExpiration: action.expiration }
      }
      case actionTypes.SET_TRACKS: {
        return { ...state, tracks: action.tracks }
      }
      case actionTypes.SET_SOLVED: {
        const clonedTracks = JSON.parse(JSON.stringify(state.tracks))
        clonedTracks[action.track].solved = true
        const newState = { ...state, tracks: clonedTracks }
        console.log(newState)
        return newState
      }
      case actionTypes.SET_IS_PLAYING: {
        return { ...state, isPlaying: action.id }
      }
      case actionTypes.SET_PLAYER_REF: {
        return { ...state, playerRef: action.ref }
      }
      case actionTypes.SET_LAST_SELECTED_TILE: {
        console.log('SET_LAST_SELECTED_TILE REDUCER', action.tile)
        return { ...state, lastSelectedTile: action.tile }
      }

      default:
        throw new Error()
    }
  }, initialState)

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  )
}

export default StoreProvider
