import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { useLocation, useParams } from "react-router-dom";

import request from "superagent";

//    request
//      .post("https://github.com/login/oauth/access_token")
//      .send({
//        client_id: config.GITHUB_KEY,
//        client_secret: 'asdas',
//        code: code
//       })
//      //  .set("X-API-Key", "foobar")
//      .set("Accept", "application/json")
//      .then((response) => {
//        //  alert("yay got " + JSON.stringify(res.body));
//        const data = response.body;
//      });

export const GithubCallback: React.FC = (props) => {
  const query = useQuery();
  const code = query.get("code");
  // http://localhost:3000/api/github/oauth2callback <POST>
  useEffect(() => {
    console.log("step 3 post to GH");
    request
      .post(`http://localhost:3000/api/github/oauth2callback?code=${code}`)
      .set("Accept", "application/json")
      .then((response) => {
        console.log(response); // response from api
        // const data = response.body;
        // console.log("data from auth:", data);
      });
  }, [code]);

  return (
    <>
      <h2>Callback success</h2>
      <p></p>
    </>
  );
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
