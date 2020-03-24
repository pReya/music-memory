import React from "react";
import Tile from "./Tile";
import styled from "styled-components";

const StyledContainer = styled.div`
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  flex-wrap: wrap;
  max-width: 700px;
  margin: 0 auto;
`;

function TilesContainer({ count = 9 }) {
  const fields = [...new Array(count)].map((_, i) => i + 1);
  return (
    <StyledContainer>
      {fields.map(field => (
        <Tile key={field} number={field} />
      ))}
    </StyledContainer>
  );
}

export default TilesContainer;
