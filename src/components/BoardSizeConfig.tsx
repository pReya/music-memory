import React, { useContext } from "react";
import styled from "styled-components";
import { Store } from "../state/Stores";
import { setTiles } from "../state/Actions";

const StyledContainer = styled.div`
  margin-top: 50px;
`;

const BoardSizeConfig: React.FC = () => {
  const {
    state: { tiles },
    dispatch,
  } = useContext(Store);

  return (
    <StyledContainer>
      <label htmlFor="board-size">Number of Tiles: </label>
      <input
        id="board-size"
        name="board-size"
        min="4"
        max="100"
        step="2"
        type="number"
        defaultValue={tiles}
        onChange={(event) => {
          dispatch(setTiles(Number(event.target.value)));
        }}
      />
    </StyledContainer>
  );
};

export default BoardSizeConfig;
