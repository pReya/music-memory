import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  img {
    width: 175px;
  }
`;

function PlaylistTile({ image, name, playlistId, onClick }) {
  return (
    <StyledWrapper onClick={onClick} id={playlistId}>
      <img src={image} />
      <span>{name}</span>
    </StyledWrapper>
  );
}

export default PlaylistTile;
