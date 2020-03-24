import React, { createContext, useReducer } from "react";
import { actionTypes } from "./Actions";

const initialState = {
  token: "",
  data: null
};
export const store = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actionTypes.SET_TOKEN: {
        console.log("SET TOKEN REDUCER");
        return { ...state, token: action.token };
      }
      case actionTypes.FETCH_PLAYLIST: {
        console.log("FETCH DATA REDUCER");
        return { ...state, data: action.data };
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
