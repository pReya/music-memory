import React, { createContext } from "react";
import { actionTypes } from "./Actions";
import { createReducer } from "react-use";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

// Setup state: 0 = initial, 1 = API authorization, 2 = playlist selected (ready to play)

const initialState = {
  tracks: [],
  tiles: 12,
  isPlaying: false,
  progress: 0,
  lastPlayed: null,
  moveCounter: 0,
  pairCounter: 0,
  setupProcessState: 0,
  playlists: [
    {
      id: "37i9dQZF1DXbTxeAdrVG2l",
      image: "https://i.scdn.co/image/ab67706f0000000286e3efd63dc4b6507a9d91be",
      name: "All Out 90s",
    },
    {
      id: "37i9dQZF1DX802IXCAaWtY",
      image: "https://i.scdn.co/image/ab67706f000000025ccc96ee94c38e7e31438d63",
      name: "90s Eurodance",
    },
    {
      id: "37i9dQZF1DX4o1oenSJRJd",
      image: "https://i.scdn.co/image/ab67706f0000000229a474cf9edc5e08a2b66d48",
      name: "All Out 00s",
    },
    {
      id: "37i9dQZF1DX3oM43CtKnRV",
      image: "https://i.scdn.co/image/ab67706f000000022cdb0982697cc0ae43b1b5b6",
      name: "00s Rock Anthems",
    },
    {
      id: "37i9dQZF1DX0Ew6u9sRtTY",
      image: "https://i.scdn.co/image/ab67706f0000000251ad399cfdc8053ea936c0e7",
      name: "One-Hit Wonders",
    },
    {
      id: "37i9dQZF1DX5Ejj0EkURtP",
      image: "https://i.scdn.co/image/ab67706f00000002ed64df41538a20b0af429383",
      name: "All Out 10s",
    },
  ],
};

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  const logger = createLogger({
    predicate: (getState, action) => action.type !== actionTypes.SET_PROGRESS,
    collapsed: (getState, action, logEntry) => !logEntry.error,
    timestamp: false,
  });
  middlewares.push(logger);
}

const useThunkReducer = createReducer(...middlewares);

export const Store = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useThunkReducer((state, action) => {
    switch (action.type) {
      case actionTypes.SET_TRACKS: {
        return { ...state, tracks: action.tracks };
      }
      case actionTypes.SET_SOLVED: {
        const clonedTracks = JSON.parse(JSON.stringify(state.tracks));
        clonedTracks[action.track - 1].solved = true;
        const newState = { ...state, tracks: clonedTracks };
        return newState;
      }
      case actionTypes.SET_PROGRESS: {
        if (state.progress !== action.progress) {
          return { ...state, progress: action.progress };
        }
        return state;
      }
      case actionTypes.SET_LAST_PLAYED: {
        return { ...state, lastPlayed: action.id };
      }
      case actionTypes.SET_IS_PLAYING: {
        return { ...state, isPlaying: action.isPlaying };
      }
      case actionTypes.INCREMENT_MOVE_COUNTER: {
        return { ...state, moveCounter: state.moveCounter + 1 };
      }
      case actionTypes.INCREMENT_PAIR_COUNTER: {
        return { ...state, pairCounter: state.pairCounter + 1 };
      }
      case actionTypes.SET_SETUP_PROGRESS: {
        return { ...state, setupProcessState: action.newSetupState };
      }
      case actionTypes.SET_TILES: {
        return { ...state, tiles: action.tiles };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export default StoreProvider;
