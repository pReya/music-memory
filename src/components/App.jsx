import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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
// import CircularProgress from "./CircularProgress";

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
    <Routes>
      <Route
        path="/callback"
        element={<UrlCallback location={window.location} />}
      />
      <Route
        path="/"
        element={
          <StyledApp>
            <h1>Music Memory</h1>
            {/* <CircularProgress progress={80} /> */}
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
        }
      />
    </Routes>
  );
}
