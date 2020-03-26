import React, { createContext } from "react";
import { useThunkReducer } from "react-hook-thunk-reducer";
import { actionTypes } from "./Actions";

const initialState = {
  token: "",
  tracks: null,
  tiles: 9,
  isPlaying: false,
  lastSelectedTile: null
};

export const store = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useThunkReducer((state, action) => {
    switch (action.type) {
      case actionTypes.SET_TOKEN: {
        console.log("SET_TOKEN REDUCER", action.token);
        return { ...state, token: action.token };
      }
      case actionTypes.FETCH_PLAYLIST: {
        console.log("FETCH_PLAYLIST REDUCER");
        return { ...state, tracks: action.tracks };
      }
      case actionTypes.SET_IS_PLAYING: {
        console.log("SET_IS_PLAYING REDUCER", action.id);
        return { ...state, isPlaying: action.id };
      }
      case actionTypes.SET_LAST_SELECTED_TILE: {
        console.log("SET_LAST_SELECTED_TILE REDUCER", action.tile);
        return { ...state, lastSelectedTile: action.tile };
      }

      default:
        throw new Error();
    }
  }, initialState);

  return (
    <store.Provider value={{ state, dispatch }}>{children}</store.Provider>
  );
};

export default StoreProvider;
