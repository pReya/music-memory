import React, { useContext, useEffect } from 'react'
import Tile from './Tile'
import styled from 'styled-components'
import { store } from '../state/Stores'
import { setTracks } from '../state/Actions'

const StyledContainer = styled.div`
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  flex-wrap: wrap;
  max-width: 700px;
  margin: 40px auto;
`

const shuffleArray = array => {
  const clonedArray = JSON.parse(JSON.stringify(array))
  for (let i = clonedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]]
  }
  return clonedArray
}

function TilesContainer ({ count: tilesCount = 9 }) {
  const { state, dispatch } = useContext(store)

  // Modify state.tracks from raw API result to filtered, randomized and shortened array
  useEffect(() => {
    console.log('Use Effect')
    if (state.tracks.length > tilesCount + 1) {
      console.log('Creating tracks array')
      // Tracks array length of count (if count is even) or count+1 (if count is odd) -> tracksArrayLength is always even
      const tracksArrayLength = tilesCount % 2 === 0 ? tilesCount : tilesCount + 1

      const shuffledApiResults = shuffleArray(state.tracks)

      const initialisedFields = [
        ...new Array(tracksArrayLength)
      ].map((_, i) => shuffledApiResults[i % (tracksArrayLength / 2)])
      dispatch(setTracks(shuffleArray(initialisedFields)))
    }
  }, [state, tilesCount, dispatch])

  return (
    <StyledContainer>
      {Boolean(state.tracks.length) && state.tracks.map((track, i) => (
        <Tile key={i + 1} number={i + 1} trackData={track} />
      ))}
    </StyledContainer>
  )
}

export default TilesContainer
