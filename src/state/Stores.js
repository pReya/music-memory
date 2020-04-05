import React, { createContext } from 'react'
import { actionTypes } from './Actions'
import { createReducer } from 'react-use'
import thunk from 'redux-thunk'

const initialState = {
  tracks: [],
  tiles: 9,
  isPlaying: false,
  progress: 0,
  lastPlayed: null,
  moveCounter: 0,
  pairCounter: 0
}

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')
  const logger = createLogger({
    predicate: (getState, action) => action.type !== actionTypes.SET_PROGRESS,
    collapsed: (getState, action, logEntry) => !logEntry.error,
    timestamp: false
  })
  middlewares.push(logger)
}

const useThunkReducer = createReducer(...middlewares)

export const Store = createContext(initialState)

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useThunkReducer((state, action) => {
    switch (action.type) {
      case actionTypes.SET_TRACKS: {
        return { ...state, tracks: action.tracks }
      }
      case actionTypes.SET_SOLVED: {
        const clonedTracks = JSON.parse(JSON.stringify(state.tracks))
        clonedTracks[action.track - 1].solved = true
        const newState = { ...state, tracks: clonedTracks }
        return newState
      }
      case actionTypes.SET_PROGRESS: {
        return { ...state, progress: action.progress }
      }
      case actionTypes.SET_LAST_PLAYED: {
        return { ...state, lastPlayed: action.id }
      }
      case actionTypes.SET_IS_PLAYING: {
        return { ...state, isPlaying: action.isPlaying }
      }
      case actionTypes.INCREMENT_MOVE_COUNTER: {
        return { ...state, moveCounter: state.moveCounter + 1 }
      }
      case actionTypes.INCREMENT_PAIR_COUNTER: {
        return { ...state, pairCounter: state.pairCounter + 1 }
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
