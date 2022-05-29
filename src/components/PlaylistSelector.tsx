import React, { useContext } from "react";
import { Store } from "../state/Stores";
import styled from "styled-components";
import PlaylistTile from "./PlaylistTile";
import { checkAuthAndGetPlaylist, setSetupProgress } from "../state/Actions";

const StyledSlider = styled.div`
  margin-top: 50px;
  display: flex;
  max-width: 80%;
  overflow: auto;
`;

const PlaylistSelector: React.FC = () => {
  const {
    dispatch,
    state: { playlists },
  } = useContext(Store);

  return (
    <StyledSlider>
      {playlists.map((playlist) => (
        <PlaylistTile
          onClick={() => {
            dispatch(checkAuthAndGetPlaylist(playlist.id));
            dispatch(setSetupProgress(2));
          }}
          key={playlist.id}
          playlistId={playlist.id}
          name={playlist.name}
          image={playlist.image}
        />
      ))}
    </StyledSlider>
  );
};

export default PlaylistSelector;
