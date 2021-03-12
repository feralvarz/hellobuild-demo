import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../AuthContext";
import "./FavoriteRepositories.css";

export interface IFavoriteRepositoriesProps {
  repos: any[];
}
export const FavoriteRepositories: React.FC<IFavoriteRepositoriesProps> = (
  props: IFavoriteRepositoriesProps
) => {
  return (
    <>
      <SearchRepo repos={props.repos} />
    </>
  );
};

export const SearchRepo: React.FC<IFavoriteRepositoriesProps> = (
  props: IFavoriteRepositoriesProps
) => {
  const { favs, setFavorite } = useAuth();
  const changeRef = useRef<number>(0);
  const [results, setResults] = useState<any>([]);

  const handleResult = (data: any) => {
    const items = props.repos.filter((repo) => {
      const rname: string = repo.name;
      return rname.includes(data.repoName);
    });

    setResults(items);
  };

  const addFavorite = (item: any) => {
    setFavorite((currState: any) => {
      const updatedState = JSON.parse(JSON.stringify(currState));
      updatedState.byName[item.id] = item;
      setResults([]);

      return updatedState;
    });
  };

  const removeFavorite = (id: string) => {
    setFavorite((currState: any) => {
      const updatedState = JSON.parse(JSON.stringify(currState));

      delete updatedState.byName[id];

      return updatedState;
    });
  };

  if (changeRef.current === 0) {
    handleResult({ name: "" });
    changeRef.current = new Date().getTime();
  }

  const { register, handleSubmit } = useForm<{ name: string }>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  return (
    <>
      <div className="fav-repos-wrapper search-wrapper">
        <h3>Search </h3>
        <form onSubmit={handleSubmit(handleResult)} autoComplete="off">
          <div style={{ marginBottom: 20 }}>
            <input
              ref={register()}
              type="text"
              placeholder="Search repository"
              name="repoName"
            />
            <button type="submit">Search</button>
          </div>
        </form>
        <ul>
          {results.map((repo: any) => (
            <li key={repo.id}>
              <div>
                <h2>{repo.name}</h2>
                <button onClick={() => addFavorite(repo)}>Add favorite</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="fav-repos-wrapper">
        <ul>
          {Object.values(favs.byName).map((repo: any, index) => (
            <li key={index}>
              {repo.name}{" "}
              <span>
                <button onClick={() => removeFavorite(repo.id)}>
                  Remove item
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
