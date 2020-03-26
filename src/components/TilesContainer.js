import React, { useContext, useEffect, useState } from "react";
import Tile from "./Tile";
import styled from "styled-components";
import { store } from "../state/Store";

const StyledContainer = styled.div`
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  flex-wrap: wrap;
  max-width: 700px;
  margin: 0 auto;
`;

function TilesContainer({ count = 9 }) {
  const { state } = useContext(store);
  const [fields, setFields] = useState([]);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    if (state.tracks) {
      console.log("Creating arrays");
      // Create array with length of count (if count is even) or count+1 (if count is odd)
      const initialisedFields = [
        ...new Array(count % 2 == 0 ? count : count + 1)
      ].map((_, i) => state.tracks[i % Math.ceil(count / 2)]);
      shuffleArray(initialisedFields);
      setFields(initialisedFields);
      console.log(initialisedFields);
    }
  }, [state.tracks]);

  return (
    <StyledContainer>
      {fields.map((field, i) => (
        <Tile key={i + 1} number={i + 1} trackData={field} />
      ))}
    </StyledContainer>
  );
}

export default TilesContainer;
