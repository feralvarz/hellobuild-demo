import React, { useRef } from "react";
import { Redirect } from "react-router-dom";
import { useGithubTokenCallback, useQuery } from "../../hooks/hooks";

export const GithubCallback: React.FC = (props) => {
  const [ghToken, setGHToken] = useGithubTokenCallback();
  const { complete } = ghToken;
  const query = useQuery();
  const code: string | null = query.get("code");
  const apiResponse: React.MutableRefObject<boolean> = useRef(false);

  if (!apiResponse.current) {
    setGHToken({ code });
    apiResponse.current = true;
  }

  return <>{complete && <Redirect to="/" />}</>;
};
