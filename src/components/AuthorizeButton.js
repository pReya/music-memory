import React, { useContext } from "react";
import styled from "styled-components";
import { Store } from "../state/Stores";

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.lightGray};
  text-transform: uppercase;
  color: white;
  border: 0;
  line-height: 18px;
  font-size: 12px;
  border-radius: 45px;
  padding: 16px 34px;
  letter-spacing: 1.76px;
  max-width: 400px;
  font-weight: 700;

  &:not([disabled]) {
    background-color: ${(props) => props.theme.colors.spotifyGreen};
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.colors.spotifyGreenHover};
    }
  }
`;

const clientId = "50d55bc1f9274bcb949c49e24214a22e";
const redirectUri = window.location.origin + "/callback";

const url = `https://accounts.spotify.com/authorize?
client_id=${clientId}&
redirect_uri=${encodeURIComponent(redirectUri)}&
response_type=token`;

function AuthorizeButton() {
  const {
    state: { tracks },
  } = useContext(Store);
  const userIsNotAuthorized = tracks.length === 0;
  const onClick = () => {
    window.location.assign(url);
  };

  return (
    <StyledButton disabled={!userIsNotAuthorized} onClick={onClick}>
      {userIsNotAuthorized ? "Sign In On Spotify" : "You're signed in"}
    </StyledButton>
  );
}

export default AuthorizeButton;
