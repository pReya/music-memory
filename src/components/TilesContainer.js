import React, { useContext, useEffect, useState } from "react";
import Tile from "./Tile";
import styled from "styled-components";
import { store } from "../state/Store";
import { setTracks } from "../state/Actions";

const StyledContainer = styled.div`
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  flex-wrap: wrap;
  max-width: 700px;
  margin: 40px auto;
`;

function TilesContainer({ count = 9 }) {
  const { state, dispatch } = useContext(store);
  const [fields, setFields] = useState([]);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    if (state.tracks && state.tracks.length > count+1) {
      console.log("Creating arrays");
      // Create array with length of count (if count is even) or count+1 (if count is odd)
      const initialisedFields = [
        ...new Array(count % 2 === 0 ? count : count + 1)
      ].map((_, i) => state.tracks[i % Math.ceil(count / 2)]);
      shuffleArray(initialisedFields);
      setFields(initialisedFields);
      dispatch(setTracks(initialisedFields));
      console.log(initialisedFields);
    }
  }, [state.tracks, count]);

  return (
    <StyledContainer>
      {fields.map((field, i) => (
        <Tile key={i + 1} number={i + 1} trackData={field} />
      ))}
    </StyledContainer>
  );
}

export default TilesContainer;
