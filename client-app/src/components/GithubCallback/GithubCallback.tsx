import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import request from "superagent";

export const GithubCallback: React.FC = (props) => {
  const apiResponse: React.MutableRefObject<string | null> = useRef(null);
  const query = useQuery();
  const code = query.get("code");

  useEffect(() => {
    console.log("step 3 post to GH");
    request
      .post(`http://localhost:3000/api/github/oauth2callback?code=${code}`)
      .set("Accept", "application/json")
      .then((response) => {
        apiResponse.current = response.text; // gh is authorized
      });
  }, [code]);

  return (
    <>
      <h2>Callback success</h2>
      <p>{apiResponse}</p>
    </>
  );
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
