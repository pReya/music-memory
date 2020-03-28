import React, { createContext } from 'react'
import { useThunkReducer } from 'react-hook-thunk-reducer'
import { actionTypes } from './Actions'

const initialState = {
  apiToken: '',
  apiExpiration: 0,
  tracks: [],
  tiles: 9,
  isPlaying: false,
  isPlayingRef: null,
  lastSelectedTile: null
}

export const store = createContext(initialState)

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useThunkReducer((state, action) => {
    switch (action.type) {
      case actionTypes.SET_API_INFO: {
        return { ...state, apiToken: action.token, apiExpiration: action.expiration }
      }
      case actionTypes.SET_TRACKS: {
        console.log('SET_TRACKS', action.tracks)
        return { ...state, tracks: action.tracks }
      }
      case actionTypes.SET_SOLVED: {
        console.log('SET_SOLVED', action.track)
        const clonedTracks = JSON.parse(JSON.stringify(state.tracks))
        clonedTracks[action.track].solved = true
        const newState = { ...state, tracks: clonedTracks }
        console.log(newState)
        return newState
      }
      case actionTypes.SET_IS_PLAYING: {
        return { ...state, isPlaying: action.id }
      }
      case actionTypes.SET_IS_PLAYING_REF: {
        return { ...state, isPlayingRef: action.ref }
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
    <store.Provider value={{ state, dispatch }}>{children}</store.Provider>
  )
}

export default StoreProvider
