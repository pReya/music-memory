import React, { useContext, useEffect } from "react";
import { Store } from "../state/Stores";
import qs from "query-string";
import { setSetupProgress } from "../state/Actions";
import { useNavigate } from "react-router-dom";

const UrlCallback: React.FC<{}> = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();
  useEffect(() => {
    const { access_token: token, expires_in: expiration } = qs.parse(
      window.location.hash
    );

    if (token && expiration) {
      const storedToken = window.localStorage.getItem("token");
      const storedExpiry = window.localStorage.getItem(
        "expirationTimestampSeconds"
      );

      if (!storedToken && !storedExpiry) {
        const nowSeconds = Math.floor(Date.now() / 1000);
        window.localStorage.setItem("token", token as string);
        window.localStorage.setItem(
          "expirationTimestampSeconds",
          String(nowSeconds + Number(expiration))
        );
      }
      dispatch(setSetupProgress(1));
      navigate("/");
    } else {
      if (
        !window.localStorage.getItem("token") ||
        !window.localStorage.getItem("expirationTimestampSeconds")
      )
        console.error("Could not authenticate with Spotify API");
    }
  }, []);

  return <></>;
};

export default UrlCallback;
