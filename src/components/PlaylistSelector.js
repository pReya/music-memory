import React, { useContext } from "react";
import { Store } from "../state/Stores";
import styled from "styled-components";
import PlaylistTile from "./PlaylistTile";

const StyledSlider = styled.div`
  display: flex;
`;

function PlaylistSelector() {
  const {
    state: { playlistIds },
  } = useContext(Store);

  return (
    <StyledSlider>
      {playlistIds.map((playlistId) => {
        return <PlaylistTile key={playlistId} name="Hallo" image="hallo.jpg" />;
      })}
    </StyledSlider>
  );
}

export default PlaylistSelector;
