import React, { useContext, useEffect } from "react";
import { Store } from "../state/Stores";
import qs from "query-string";
import { setSetupProgress } from "../state/Actions";
import { useHistory } from "react-router-dom";

function UrlCallback() {
  const { dispatch } = useContext(Store);
  const history = useHistory();
  useEffect(() => {
    const { access_token: token, expires_in: expiration } = qs.parse(
      window.location.hash
    );
    if (token && expiration) {
      const nowSeconds = Math.floor(Date.now() / 1000);
      window.localStorage.setItem("token", token);
      window.localStorage.setItem(
        "expirationTimestampSeconds",
        Number(nowSeconds) + Number(expiration)
      );
      dispatch(setSetupProgress(1));
      history.push("/");
    } else {
      console.error("Could not authenticate with Spotify API");
    }
  }, []);

  return <></>;
}

export default UrlCallback;
