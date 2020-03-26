import React, { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import TilesContainer from "./components/TilesContainer";
import AuthorizeButton from "./components/AuthorizeButton";
import { store } from "./state/Store";
import { setToken, fetchData } from "./state/Actions";
import qs from "query-string";

const StyledApp = styled.div`
  box-sizing: border-box;
  font-family: sans-serif;
`;

export default function App() {
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  useEffect(() => {
    console.log("Use Effect", state);
    if (state.token && !state.tracks) {
      console.log("Calling fetchData");
      dispatch(fetchData("playlists/0D5oNpkqZxdmklYvWwDKYI", state.token));
    }
  }, [dispatch, state]);

  return (
    <StyledApp>
      <Route
        path="/callback"
        render={() => {
          console.log("Callback");
          const token = qs.parse(window.location.hash)["access_token"];
          history.push("/");
          dispatch(setToken(token));
          console.log("Token:", token);
        }}
      />
      <h1>Music Memory</h1>
      <AuthorizeButton />

      <TilesContainer count={state.tiles} />
    </StyledApp>
  );
}
