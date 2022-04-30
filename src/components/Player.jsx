import React, { useRef, useEffect, useContext, useState } from "react";
import { Store } from "../state/Stores";
import { setIsPlaying, setProgress } from "../state/Actions";

function Player() {
  const {
    state: { isPlaying, tracks, lastPlayed },
    dispatch,
  } = useContext(Store);
  const playerRef = useRef(null);
  const [intervalHandle, setIntervalHandle] = useState(null);

  // Attach "ended" listener to reset state after song has finished playing
  useEffect(() => {
    if (playerRef.current) {
      const ref = playerRef.current;
      const handleSongEnded = () => {
        dispatch(setIsPlaying(false));
      };
      ref.addEventListener("ended", handleSongEnded);
      ref.volume = 0.3;

      return () => {
        ref.removeEventListener("ended", handleSongEnded);
      };
    }
  }, []);

  // Start and pause playback
  useEffect(() => {
    if (isPlaying) {
      // New tile selected
      playerRef.current.pause();
      playerRef.current.src = tracks[lastPlayed - 1].preview_url;
      playerRef.current.play();
    } else {
      // Same tile selected or song ended
      playerRef.current.pause();
      playerRef.current.currentTime = 0;
    }
  }, [isPlaying, tracks, playerRef, lastPlayed]);

  // Update circle progress every 200ms
  useEffect(() => {
    const handle = window.setInterval(() => {
      dispatch(
        setProgress(playerRef.current.currentTime / playerRef.current.duration)
      );
    }, 200);
    setIntervalHandle(handle);
    return () => {
      window.clearInterval(intervalHandle);
    };
  }, []);

  return (
    <audio ref={playerRef}>
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  );
}

export default Player;
