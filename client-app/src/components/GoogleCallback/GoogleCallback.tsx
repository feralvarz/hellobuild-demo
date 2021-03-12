import React, { useRef } from "react";
import { Redirect } from "react-router-dom";
import { useGoogleTokenCallback, useQuery } from "../../hooks/hooks";

export const GoogleCallback: React.FC = (props) => {
  const [calToken, setCalToken] = useGoogleTokenCallback();
  const { complete } = calToken;
  const query = useQuery();
  const code: string | null = query.get("code");
  const apiResponse: React.MutableRefObject<boolean> = useRef(false);

  if (!apiResponse.current) {
    setCalToken({ code });
    apiResponse.current = true;
  }

  return <>{complete && <Redirect to="/profile" />}</>;
};
