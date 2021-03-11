import React from "react";
import "./App.css";

const App: React.FC = (props) => {
  // target = "_blank";
  // rel = "noopener noreferrer";
  return (
    <>
      <div>
        <a className="App-link" href={getGithubOAuthURL()}>
          Authorize Github
        </a>
      </div>
      <main>{props.children}</main>
    </>
  );
};

/**
 *
 * @returns Generates a github url to authorize the application
 */
function getGithubOAuthURL(): string {
  const ghOptions = {
    clientId: "bdff31232777fec87534",
    scopes:
      "public_repo%20read:gpg_key%20read:org%20read:public_key%20read:repo_hook%20repo:status%20repo_deployment%20user",
    redirectURI: "http://localhost:3001/github/oauth2callback",
    // secret: generateSecret(10),
  };

  const githubOauthUrl: string = `https://github.com/login/oauth/authorize?client_id=${ghOptions.clientId}&scope=${ghOptions.scopes}&redirect_uri=${ghOptions.redirectURI}`;

  //&state=${ghOptions.secret}

  return githubOauthUrl;
}

/**
 * Generates a random hex string from a given size
 * @param size The lenght of the string
 * @returns string
 */
// function generateSecret(size: number): string {
//   return [...Array(size)]
//     .map(() => Math.floor(Math.random() * 16).toString(16))
//     .join("");
// }

export default App;
