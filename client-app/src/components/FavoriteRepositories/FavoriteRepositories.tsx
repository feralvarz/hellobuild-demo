import React from "react";
import "./FavoriteRepositories.css";

export interface IFavoriteRepositoriesProps {
  repos: any[];
}
export const FavoriteRepositories: React.FC<IFavoriteRepositoriesProps> = (
  props: IFavoriteRepositoriesProps
) => {
  return (
    <>
      <div className="fav-repos-wrapper">
        <ul>
          {props.repos.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
