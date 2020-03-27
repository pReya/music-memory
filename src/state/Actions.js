export const actionTypes = {
  SET_API_TOKEN: "SET_API_TOKEN",
  SET_TRACKS: "SET_TRACKS",
  SET_IS_PLAYING: "SET_IS_PLAYING",
  SET_LAST_SELECTED_TILE: "SET_LAST_SELECTED_TILE",
  SET_IS_PLAYING_REF: "SET_IS_PLAYING_REF"
};

export function setLastSelectedTile(tile) {
  return {
    type: actionTypes.SET_LAST_SELECTED_TILE,
    tile
  };
}

export function setIsPlayingRef(ref) {
  return {
    type: actionTypes.SET_IS_PLAYING_REF,
    ref
  };
}

export function setApiToken(token) {
  return {
    type: actionTypes.SET_API_TOKEN,
    token
  };
}

export function setIsPlaying(id) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    id
  };
}

export function setTracks(tracks) {
  return {
    type: actionTypes.SET_TRACKS,
    tracks
  };
}

export function fetchData(endpoint, token) {
  return async (dispatch, getState) => {
    const data = await fetch("https://api.spotify.com/v1/" + endpoint, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    const dataJSON = await data.json();
    const filteredData = dataJSON.tracks.items
      .map(
        trackObject =>
          trackObject.track.preview_url && {
            id: trackObject.track.id,
            preview_url: trackObject.track.preview_url
          }
      )
      .filter(Boolean);
    console.log("Filtered Data", filteredData);
    dispatch(setTracks(filteredData));
  };
}
