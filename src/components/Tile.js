import React, { useContext } from "react";
import { Store } from "../state/Stores";
import styled from "styled-components";
import { startOrPausePlayback } from "../state/Actions";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import theme from "../theme";

const StyledWrapper = styled.div`
  border: 1px solid;
  border-color: ${({ selected, theme }) =>
    selected ? "red" : theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.lightGray};
  ${
    "" /* background: ${({ solved, theme, bgImage }) =>
    solved ? `url('${bgImage}')` : 'white'}; */
  }
  background-color: ${({ solved, theme }) =>
    solved ? theme.colors.spotifyGreen : "white"};
  box-sizing: border-box;
  width: 150px;
  height: 150px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  transition-duration: 0.5s;
  transition-property: transform, color, border-color;
  cursor: pointer;
  margin: 10px;
  padding: 25px;

  &:hover,
  &:focus,
  &:active {
    transform: scale(1.05);
    color: rgba(0, 0, 0, 0.6);
    border-color: ${({ selected, theme }) =>
      selected ? "red" : theme.colors.darkGray};
  }

  .unsolved {
    font-size: 2.5em;
    ${
      "" /* background-color: ${({ solved, theme }) =>
    solved ? theme.colors.spotifyGreen : 'white'}; */
    }
  }

  .solved {
    font-size: 1em;
    ${
      "" /* position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.spotifyGreen + '80'}; */
    }
  }
`;

function Tile(props) {
  const { number } = props;
  const {
    dispatch,
    state: { lastPlayed, isPlaying, progress, tracks },
  } = useContext(Store);
  const tileIsPlaying = isPlaying && lastPlayed === number;
  const selected = lastPlayed === number;
  const solved = tracks[number - 1].solved;

  return (
    <StyledWrapper
      bgImage={tracks[number - 1].images[1].url}
      solved={solved}
      selected={tileIsPlaying || selected}
      onClick={() =>
        (!solved || isPlaying) && dispatch(startOrPausePlayback(number))
      }
    >
      {tileIsPlaying ? (
        <CircularProgressbar
          className="unsolved"
          value={progress}
          text={number}
          maxValue={1}
          styles={{
            path: {
              stroke: `${theme.colors.darkGray}`,
              strokeLinecap: "butt",
            },
            trail: {
              stroke: `${theme.colors.lightGray}`,
              strokeLinecap: "butt",
            },
            text: {
              fill: `${theme.colors.darkGray}`,
              fontSize: "2.5rem",
            },
          }}
        />
      ) : (
        <>
          {solved ? (
            <div className="solved">
              <div>{tracks[number - 1].artist} - </div>
              <div>{tracks[number - 1].name}</div>
            </div>
          ) : (
            <div className="unsolved">{String(number)}</div>
          )}
        </>
      )}
    </StyledWrapper>
  );
}

export default Tile;
