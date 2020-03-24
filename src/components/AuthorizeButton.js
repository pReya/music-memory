import React from "react";
import styled from "styled-components";

const StyledButton = styled.button``;

const clientId = "50d55bc1f9274bcb949c49e24214a22e";
const redirectUri = "https://tz26b.csb.app/callback";

const url = `https://accounts.spotify.com/authorize?
client_id=${clientId}&
redirect_uri=${encodeURI(redirectUri)}&
response_type=token`;

function AuthorizeButton() {
  const onClick = () => {
    window.location.assign(url);
  };

  return <StyledButton onClick={onClick}>Authorize me!</StyledButton>;
}

export default AuthorizeButton;
