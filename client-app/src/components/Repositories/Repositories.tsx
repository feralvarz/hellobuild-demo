import React, { useEffect } from "react";
import { useAuth } from "../../AuthContext";
import {
  getGithubOAuthURL,
  useFirstRender,
  useListRepos,
} from "../../hooks/hooks";
import { FavoriteRepositories } from "../FavoriteRepositories/FavoriteRepositories";

export const Repositories: React.FC = (props: any) => {
  const { ghAuthorized, setGHAuthorized } = useAuth();

  const [repositories, setRequestRepos] = useListRepos();
  const firstRender = useFirstRender();

  useEffect(() => {
    if (firstRender) {
      setGHAuthorized({});
      setRequestRepos({});
    }
  });

  return (
    <>
      <div>
        <div style={{ display: "inline-block" }}>
          <h2>Github Repositories</h2>
          {ghAuthorized?.data !== null && ghAuthorized?.data === false && (
            <a href={getGithubOAuthURL()}>Authorize Github</a>
          )}
          {ghAuthorized?.data && (
            <ul>
              {repositories.data &&
                repositories.data.map((repo: any) => (
                  <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>
          )}
        </div>
        <FavoriteRepositories repos={repositories.data || []} />
      </div>
    </>
  );
};
