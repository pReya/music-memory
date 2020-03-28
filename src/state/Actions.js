export const actionTypes = {
  SET_API_INFO: 'SET_API_INFO',
  SET_TRACKS: 'SET_TRACKS',
  SET_IS_PLAYING: 'SET_IS_PLAYING',
  SET_LAST_SELECTED_TILE: 'SET_LAST_SELECTED_TILE',
  SET_IS_PLAYING_REF: 'SET_IS_PLAYING_REF',
  SET_SOLVED: 'SET_SOLVED'
}

export function setLastSelectedTile (tile) {
  return {
    type: actionTypes.SET_LAST_SELECTED_TILE,
    tile
  }
}

export function setIsPlayingRef (ref) {
  return {
    type: actionTypes.SET_IS_PLAYING_REF,
    ref
  }
}

export function setApiInfo (token, expiration) {
  return {
    type: actionTypes.SET_API_INFO,
    token,
    expiration
  }
}

export function setIsPlaying (id) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    id
  }
}

export function setTracks (tracks) {
  return {
    type: actionTypes.SET_TRACKS,
    tracks
  }
}

export function setSolved (track) {
  return {
    type: actionTypes.SET_SOLVED,
    track
  }
}

export function fetchData (endpoint, token) {
  return async (dispatch, getState) => {
    const data = await window.fetch('https://api.spotify.com/v1/' + endpoint, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    const dataJSON = await data.json()
    const filteredData = dataJSON.tracks.items
      .map(
        trackObject =>
          trackObject.track.preview_url && {
            id: trackObject.track.id,
            preview_url: trackObject.track.preview_url,
            solved: false
          }
      )
      .filter(Boolean)
    console.log('Filtered Data', filteredData)
    dispatch(setTracks(filteredData))
  }
}
