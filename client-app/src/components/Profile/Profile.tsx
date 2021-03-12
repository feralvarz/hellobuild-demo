import React from "react";
import { useGithubAuthorized, useListRepos } from "../../hooks/hooks";

export const Profile: React.FC = (props: any) => {
  const [ghAuthorized, setGHAuthorized] = useGithubAuthorized();
  const [repositories, setRequestRepos] = useListRepos();

  return (
    <>
      <h1>Profile component</h1>
      <div>
        <h2>Github Repositories</h2>
        <button onClick={setGHAuthorized}>Check GH Authorization</button>
        {ghAuthorized.data && (
          <button onClick={setRequestRepos}>List Repositories</button>
        )}
        {/* {ghAuthorized.data && (
          <>
            <button onClick={setRequestRepos}>Check GH Authorization</button>
            {repositories.data && (<>
            <ul>
              {repositories.data.map((repo:any) => (<>
              <li>{repo.name}</li>
                </>)
              )}

            </ul>
            </>)}

          </>
        )} */}
      </div>
    </>
  );
};
