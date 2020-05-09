import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import TilesContainer from "./TilesContainer";
import AuthorizeButton from "./AuthorizeButton";
import { Store } from "../state/Stores";
import Player from "./Player";
import PlaylistSelector from "./PlaylistSelector";
import UrlCallback from "./UrlCallback";
import { getApiTokenFromStorage } from "../util/helpers";
import { setSetupProgress } from "../state/Actions";
import BoardSizeConfig from "./BoardSizeConfig";
import "typeface-ibm-plex-sans";

const StyledApp = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "${({ theme }) => theme.baseFont}", "sans-serif";
`;

export default function App() {
  const { dispatch, state } = useContext(Store);

  useEffect(() => {
    if (state.setupProcessState === 0) {
      const token = getApiTokenFromStorage();
      if (token) dispatch(setSetupProgress(1));
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
        {state.setupProcessState === 1 && (
          <>
            <BoardSizeConfig />
            <PlaylistSelector />
          </>
        )}
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
