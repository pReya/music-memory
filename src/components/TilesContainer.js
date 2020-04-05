import React, { useContext } from 'react'
import Tile from './Tile'
import styled from 'styled-components'
import { Store } from '../state/Stores'

const StyledContainer = styled.div`
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 20px auto;
`

function TilesContainer ({ count }) {
  const { state: { tracks } } = useContext(Store)

  return (
    <StyledContainer>
      {Boolean(tracks.length) && tracks.map((track, i) => (
        <Tile key={i + 1} number={i + 1} />
      ))}
    </StyledContainer>
  )
}

export default TilesContainer
