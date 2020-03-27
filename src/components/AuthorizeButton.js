import React, { useContext } from "react";
import { store } from "../state/Store";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.lightGray};
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
    background-color: ${props => props.theme.colors.spotifyGreen};
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.colors.spotifyGreenHover};
    }
  }
`;

const clientId = "50d55bc1f9274bcb949c49e24214a22e";
const redirectUri = "https://015fa7e8.eu.ngrok.io/callback";

const url = `https://accounts.spotify.com/authorize?
client_id=${clientId}&
redirect_uri=${encodeURI(redirectUri)}&
response_type=token`;

function AuthorizeButton() {
  const {
    state: { apiToken }
  } = useContext(store);
  const onClick = () => {
    window.location.assign(url);
  };

  return (
    <StyledButton disabled={Boolean(apiToken)} onClick={onClick}>
      Sign In On Spotify
    </StyledButton>
  );
}

export default AuthorizeButton;
