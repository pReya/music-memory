import React, { useRef, useContext, useEffect, useState } from "react";
import { store } from "../state/Store";
import styled from "styled-components";
import { setIsPlaying, setLastSelectedTile } from "../state/Actions";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import theme from "../theme";

const StyledWrapper = styled.div`
  border: 1px solid;
  border-color: ${({ playing, theme }) =>
    playing ? "red" : theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.lightGray};
  box-sizing: border-box;
  border-radius: 5px;
  width: 150px;
  height: 150px;
  font-size: 2.5em;
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
  padding: 20px;

  &:hover,
  &:focus,
  &:active {
    transform: scale(1.05);
    color: rgba(0, 0, 0, 0.6);
    border-color: ${({ playing, theme }) =>
      playing ? "red" : theme.colors.darkGray};
  }
`;

function Tile({ number = 12, trackData }) {
  const audioElementRef = useRef(null);
  const { state, dispatch } = useContext(store);
  const [progress, setProgress] = useState(0);
  const tileIsPlaying = state.isPlaying === number;

  useEffect(() => {
    if (tileIsPlaying) {
      setInterval(
        () =>
          setProgress(
            audioElementRef.current.currentTime /
              audioElementRef.current.duration
          ),
        200
      );
    }
  }, [tileIsPlaying]);

  return (
    <StyledWrapper
      playing={tileIsPlaying}
      onClick={() => {
        audioElementRef.current.addEventListener("ended", () => {
          dispatch(setIsPlaying(false));
          console.log("Ended");
        });
        if (!state.isPlaying) {
          if (
            state.lastSelectedTile &&
            state.tracks[state.lastSelectedTile].id === state.tracks[number]
          ) {
            console.log("Found a pair");
          }
          dispatch(setLastSelectedTile(number));

          // Start Playback
          dispatch(setIsPlaying(number));
          audioElementRef.current.play();
          console.log("Play ", number);
        } else {
          // Stop Playback
          dispatch(setIsPlaying(false));
          audioElementRef.current.pause();
          audioElementRef.current.currentTime = 0;
        }
      }}
    >
      {!tileIsPlaying && <div>{String(number)}</div>}
      {trackData && (
        <>
          <audio src={trackData.preview_url} ref={audioElementRef}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          {tileIsPlaying && (
            <CircularProgressbar
              value={progress}
              text={number}
              maxValue={1}
              styles={{
                path: {
                  stroke: `${theme.colors.darkGray}`,
                  strokeLinecap: "butt"
                },
                trail: {
                  stroke: `${theme.colors.lightGray}`,
                  strokeLinecap: "butt"
                },
                text: {
                  fill: `${theme.colors.darkGray}`,
                  fontSize: "2.5rem"
                }
              }}
            />
          )}
        </>
      )}
    </StyledWrapper>
  );
}

export default Tile;
