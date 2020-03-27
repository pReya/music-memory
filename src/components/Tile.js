import React, { useRef, useContext, useEffect, useState } from "react";
import { store } from "../state/Store";
import styled from "styled-components";
import {
  setIsPlaying,
  setLastSelectedTile,
  setIsPlayingRef
} from "../state/Actions";
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
  padding: 25px;

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
  const {
    dispatch,
    state: { lastSelectedTile, tracks, isPlaying, isPlayingRef }
  } = useContext(store);
  const [progress, setProgress] = useState(0);
  const tileIsPlaying = isPlaying === number;

  // Update circle progress every 200ms
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

  // Attach "ended" listener to reset state after song has finished playing
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.addEventListener("ended", () => {
        dispatch(setIsPlayingRef(null));
        dispatch(setIsPlaying(false));
        console.log("Ended Playing");
      });
    }
  }, [audioElementRef, dispatch]);

  const startPlaying = () => {
    dispatch(setLastSelectedTile(number));
    dispatch(setIsPlayingRef(audioElementRef));
    dispatch(setIsPlaying(number));
    audioElementRef.current.play();
    console.log("Play ", number);
  };

  const stopPlayingAndReset = () => {
    dispatch(setIsPlaying(false));
    dispatch(setIsPlayingRef(null));
    audioElementRef.current.pause();
    audioElementRef.current.currentTime = 0;
    console.log("Stop and reset playing ", number);
  };

  return (
    <StyledWrapper
      playing={tileIsPlaying}
      onClick={() => {
        lastSelectedTile &&
          console.log(
            `Last Selected Tile: ${lastSelectedTile} – id: ${
              tracks[lastSelectedTile - 1].id
            }`
          );
        console.log(`Selected Tile: ${number} – id: ${tracks[number - 1].id}`);
        if (
          lastSelectedTile &&
          lastSelectedTile !== number &&
          tracks[lastSelectedTile - 1].id === tracks[number - 1].id
        ) {
          console.warn("Found a pair");
        }
        // No song is playing, yet
        if (!isPlaying) {
          // Start Playback
          startPlaying();
        } else {
          // Tile is alreay playing -> click again to stop
          if (tileIsPlaying) {
            // Stop Playback
            stopPlayingAndReset();
          } else {
            // Stop other tile from playing and play
            isPlayingRef.current.pause();
            isPlayingRef.current.currentTime = 0;
            startPlaying();
          }
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
