import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;

  svg {
    filter: drop-shadow(8px 8px 10px black);
  }

  #outerCircle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
`;

const CircularProgress = ({ progress }) => {
  const radius = "40";
  const circumference = radius * 2 * Math.PI;
  const dashOffset = circumference - (circumference / 100) * progress;

  console.log("dashOffset", dashOffset);

  return (
    <StyledContainer>
      <svg viewBox="0 0 100 100">
        <circle
          id="outerCircle"
          fill="transparent"
          stroke="white"
          strokeWidth="12"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          r={radius}
          cx="50%"
          cy="50%"
        ></circle>
      </svg>
    </StyledContainer>
  );
};

export default CircularProgress;
