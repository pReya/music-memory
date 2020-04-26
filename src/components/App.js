import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import TilesContainer from "./TilesContainer";
import AuthorizeButton from "./AuthorizeButton";
import { Store } from "../state/Stores";
import Player from "./Player";
import PlaylistSelector from "./PlaylistSelector";
import UrlCallback from "./UrlCallback";
import { checkApiAuth } from "../util/helpers";
import { setSetupProgress } from "../state/Actions";

const StyledApp = styled.div`
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function App() {
  const { dispatch, state } = useContext(Store);

  useEffect(() => {
    if (state.setupProcessState === 0) {
      checkApiAuth().then(() => {
        dispatch(setSetupProgress(1));
      });
    }
  }, []);

  return (
    <>
      <Route path="/callback">
        <UrlCallback location={window.location} />
      </Route>
      <StyledApp>
        <h1>Music Memory</h1>
        <AuthorizeButton />
        {state.setupProcessState === 1 && <PlaylistSelector />}
        {state.setupProcessState === 2 && (
          <>
            <h2>
              Moves: {Math.floor(state.moveCounter / 2)} – Pairs:{" "}
              {state.pairCounter}
            </h2>

            <TilesContainer count={state.tiles} />
            <Player />
          </>
        )}
      </StyledApp>
    </>
  );
}
