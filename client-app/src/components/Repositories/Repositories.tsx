import React, { useEffect } from "react";
import "./Repositories.scss";
import {
  getGithubOAuthURL,
  useFirstRender,
  useGithubAuthorized,
  useListRepos,
} from "../../hooks/hooks";
import { FavoriteRepositories } from "../FavoriteRepositories/FavoriteRepositories";

import { Repo } from "./Repo";
import { Layout } from "../Layout/Layout";
export const Repositories: React.FC = () => {
  const [ghAuthorized, setGHAuthorized] = useGithubAuthorized();
  const [repositories, setRequestRepos] = useListRepos();
  const firstRender = useFirstRender();

  useEffect(() => {
    if (firstRender) {
      setGHAuthorized({});
      setRequestRepos({});
    }
  });

  return (
    <Layout>
      <div className="row h-100">
        <div className="col content">
          <div className="inner">
            <h1>Your repositories</h1>

            <div className="row repo-list">
              {ghAuthorized.data
                ? repositories.data?.map((repo: any) => (
                    <Repo key={repo.id} data={repo} />
                  ))
                : ghAuthorized?.data === false && (
                    <div className="col">
                      <a href={getGithubOAuthURL()} className="btn btn-danger">
                        Authorize github
                      </a>
                    </div>
                  )}
            </div>
          </div>
        </div>
        <aside className="col-3">
          {repositories.data && (
            <FavoriteRepositories repos={repositories.data} />
          )}
        </aside>
      </div>
    </Layout>
  );
};
