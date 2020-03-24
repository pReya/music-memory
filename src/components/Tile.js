import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  border: 2px solid;
  border-color: rgba(0, 0, 0, 0.3);
  color: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  border-radius: 4px;
  width: 150px;
  height: 150px;
  font-size: 2.5em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  transition-duration: 0.5s;
  transition-property: transform, color, border-color;
  cursor: pointer;
  margin: 10px;

  &:hover,
  &:focus,
  &:active {
    transform: scale(1.05);
    color: rgba(0, 0, 0, 0.6);
    border-color: rgba(0, 0, 0, 0.6);
  }
`;

function Tile({ number = 12 }) {
  return (
    <StyledWrapper onClick={() => console.log(number)}>
      {String(number)}
    </StyledWrapper>
  );
}

export default Tile;
