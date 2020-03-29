import React, { useContext, useEffect, useRef } from 'react'
import { Store } from '../state/Stores'
import {
  setIsPlaying, setPlayerRef
} from '../state/Actions'

function Player () {
  const {
    state: { isPlaying, tracks }, dispatch
  } = useContext(Store)
  const playerRef = useRef(null)

  // Attach "ended" listener to reset state after song has finished playing
  useEffect(() => {
    if (playerRef.current) {
      dispatch(setPlayerRef(playerRef))
      playerRef.current.addEventListener('ended', () => {
        dispatch(setIsPlaying(false))
      })
      playerRef.current.volume = 0.3
    }
  }, [playerRef])

  // useEffect(() => {
  //   if (isPlaying) {
  //     // New tile selected
  //     playerRef.current.pause()
  //     playerRef.current.src = tracks[isPlaying - 1].preview_url
  //     playerRef.current.play()
  //   } else {
  //     // Same tile selected or song ended
  //     playerRef.current.pause()
  //     playerRef.current.currentTime = 0
  //   }
  // }, [isPlaying, tracks, playerRef])

  return (
    <audio ref={playerRef}>
    Your browser does not support the
      <code>audio</code> element.
    </audio>
  )
}

export default Player
