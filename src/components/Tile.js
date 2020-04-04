import React, { useContext } from 'react'
import { Store } from '../state/Stores'
import styled from 'styled-components'
import { startOrPausePlayback } from '../state/Actions'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import theme from '../theme'

const StyledWrapper = styled.div`
  border: 1px solid;
  border-color: ${({ selected, theme }) =>
    selected ? 'red' : theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.lightGray};
  background-color: ${({ solved, theme }) =>
    solved ? theme.colors.spotifyGreen : 'white'};
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
    border-color: ${({ selected, theme }) =>
      selected ? 'red' : theme.colors.darkGray};
  }
`

function Tile (props) {
  const { number } = props
  const {
    dispatch,
    state: { lastSelectedTile, isPlaying, progress, tracks, lastPlayed }
  } = useContext(Store)
  const tileIsPlaying = (isPlaying && lastPlayed === number)
  const selected = lastSelectedTile === number
  const solved = tracks[number - 1].solved

  return (
    <StyledWrapper
      solved={solved}
      selected={tileIsPlaying || selected}
      onClick={() => dispatch(startOrPausePlayback(number))}
    >
      {tileIsPlaying ? (
        <CircularProgressbar
          value={progress}
          text={number}
          maxValue={1}
          styles={{
            path: {
              stroke: `${theme.colors.darkGray}`,
              strokeLinecap: 'butt'
            },
            trail: {
              stroke: `${theme.colors.lightGray}`,
              strokeLinecap: 'butt'
            },
            text: {
              fill: `${theme.colors.darkGray}`,
              fontSize: '2.5rem'
            }
          }}
        />
      ) : (
        <div>{String(number)}</div>
      )}
    </StyledWrapper>
  )
}

export default Tile
