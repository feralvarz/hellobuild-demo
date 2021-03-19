import React from "react";
import "./Repositories.scss";
import { getGithubOAuthURL } from "../../hooks/hooks";
import { FavoriteRepositories } from "../FavoriteRepositories/FavoriteRepositories";
import { IRepo, Repo } from "./Repo";
import { Layout } from "../Layout/Layout";
import { of } from "rxjs";
import { pluck, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// types definitions missing from use-epic package
// @ts-ignore
import { useEpic } from "use-epic";

export const Repositories: React.FC = () => {
  const [repositories] = useEpic(isAuthorized);

  return (
    <Layout>
      <div className="row h-100">
        <div className="col content">
          <div className="inner">
            <h1>Your repositories</h1>

            <div className="row repo-list">
              {repositories === null && (
                <div className="col">
                  <a href={getGithubOAuthURL()} className="btn btn-danger">
                    Authorize github
                  </a>
                </div>
              )}

              {repositories?.map((repo: IRepo) => (
                <Repo key={repo.id} data={repo} />
              ))}
            </div>
          </div>
        </div>
        <aside className="col-3">
          {repositories && <FavoriteRepositories repos={repositories} />}
        </aside>
      </div>
    </Layout>
  );
};

// Return repositories only when user is authorized
const isAuthorized = () =>
  ajax.getJSON<boolean>(`http://localhost:3000/api/github/authorized`).pipe(
    switchMap((authorized) => {
      if (!authorized) {
        return of(null);
      } else {
        return ajax
          .post(`http://localhost:3000/api/github/repos`)
          .pipe(pluck("response"));
      }
    })
  );
