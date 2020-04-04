import { shuffleArray } from '../util/helpers'

export const actionTypes = {
  SET_TRACKS: 'SET_TRACKS',
  SET_IS_PLAYING: 'SET_IS_PLAYING',
  SET_LAST_PLAYED: 'SET_LAST_PLAYED',
  SET_PROGRESS: 'SET_PROGRESS',
  SET_SOLVED: 'SET_SOLVED'
}

export function setProgress (progress) {
  return {
    type: actionTypes.SET_PROGRESS,
    progress
  }
}

export function setIsPlaying (isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    isPlaying
  }
}

export function setLastPlayed (id) {
  return {
    type: actionTypes.SET_LAST_PLAYED,
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
export function startOrPausePlayback (track) {
  return (dispatch, getState) => {
    const { tracks, isPlaying, lastPlayed } = getState()
    if (lastPlayed && (lastPlayed !== track)) {
      if (tracks[lastPlayed - 1].id === tracks[track - 1].id) {
        dispatch(setSolved(lastPlayed))
        dispatch(setSolved(track))
      }
    }

    if (isPlaying && lastPlayed) {
      // Some song is playing
      if (lastPlayed === track) {
        // Same song is playing -> Pause
        dispatch(setIsPlaying(false))
      } else {
        // Some other song is playing -> Switch song
        dispatch(setLastPlayed(track))
      }
    } else {
      // No song is playing -> Start playing
      console.log('No song is playing -> Start playing')
      dispatch(setIsPlaying(true))
      dispatch(setLastPlayed(track))
    }
  }
}

export function fetchData (endpoint, token) {
  return async (dispatch, getState) => {
    const { tiles } = getState()
    // Tracks array length of count (if count is even) or count+1 (if count is odd) -> tracksArrayLength is always even
    const tracksArrayLength = tiles % 2 === 0 ? tiles : tiles + 1

    const data = await window.fetch('https://api.spotify.com/v1/' + endpoint, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    const dataJSON = await data.json()

    // Filter out unnecessary object data and tracks w/ no preview
    const filteredData = dataJSON.tracks.items
      .map(
        (trackObject) =>
          trackObject.track.preview_url && {
            id: trackObject.track.id,
            preview_url: trackObject.track.preview_url,
            solved: false
          }
      )
      .filter(Boolean)

    const shuffledData = shuffleArray(filteredData)

    const trackTiles = [...new Array(tracksArrayLength)].map(
      (_, i) => shuffledData[i % (tracksArrayLength / 2)]
    )

    dispatch(setTracks(shuffleArray(trackTiles)))
  }
}
