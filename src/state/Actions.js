export const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
  FETCH_PLAYLIST: "FETCH_PLAYLIST",
  SET_IS_PLAYING: "SET_IS_PLAYING",
  SET_LAST_SELECTED_TILE: "SET_LAST_SELECTED_TILE"
};

export function setLastSelectedTile(tile) {
  return {
    type: actionTypes.SET_LAST_SELECTED_TILE,
    tile
  };
}

export function setToken(token) {
  return {
    type: actionTypes.SET_TOKEN,
    token
  };
}

export function setIsPlaying(id) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    id
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
    console.log("Data:", dataJSON);
    const filteredData = dataJSON.tracks.items
      .map(
        trackObject =>
          trackObject.track.preview_url && {
            id: trackObject.track.id,
            preview_url: trackObject.track.preview_url
          }
      )
      .filter(Boolean);
    console.log("Filtered", filteredData);
    dispatch({
      type: actionTypes.FETCH_PLAYLIST,
      tracks: filteredData
    });
  };
}
