export const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
  FETCH_PLAYLIST: "FETCH_PLAYLIST"
};

export function setToken(token) {
  return {
    type: actionTypes.SET_TOKEN,
    token
  };
}

export const fetchData = async (endpoint, token) => {
  const data = await fetch("https://api.spotify.com/v1/" + endpoint, {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  const dataJSON = await data.json();
  console.log("Data:", dataJSON);
  return {
    type: actionTypes.FETCH_PLAYLIST,
    data: dataJSON
  };
};
