import React, { useContext } from "react";
import { Store } from "../state/Stores";
import styled from "styled-components";
import PlaylistTile from "./PlaylistTile";

const StyledSlider = styled.div`
  margin-top: 50px;
  display: flex;
  width: 100%;
  overflow: auto;
`;

function PlaylistSelector() {
  const {
    state: { playlists },
  } = useContext(Store);

  return (
    <StyledSlider>
      {playlists.map((playlist) => (
        <PlaylistTile
          key={playlist.id}
          playlistId={playlist.id}
          name={playlist.name}
          image={playlist.image}
        />
      ))}
    </StyledSlider>
  );
}

export default PlaylistSelector;
