import React, { useRef, useState } from "react";
import { useAuth } from "../../AuthContext";
import "./FavoriteRepositories.scss";
import Select, { ActionMeta, OptionTypeBase } from "react-select";
import { Toast } from "react-bootstrap";
import {
  IFavoriteRepositoriesProps,
  ISearchOption,
  IFavRepos,
} from "./FavoriteRepositories.types";

export const FavoriteRepositories: React.FC<IFavoriteRepositoriesProps> = (
  props: IFavoriteRepositoriesProps
) => {
  return (
    <div className="fav-wrapper">
      <h2 className="h5 font-weight-normal mb-2">Favorites</h2>
      <SearchRepo repos={props.repos} />

      <FavList />
    </div>
  );
};

const FavList = () => {
  const { favs, setFavorite } = useAuth();

  // Removes repos from favorites
  const removeFavorite = (id: string) => {
    setFavorite((currState: any) => {
      const updatedState = JSON.parse(JSON.stringify(currState));
      delete updatedState.byName[id];
      return updatedState;
    });
  };

  return (
    <div className="row fav-repos-wrapper">
      {Object.values(favs.byName).map((repo: any) => (
        <div key={repo.id} className="col-12">
          <Toast onClose={() => removeFavorite(repo.id)}>
            <Toast.Header>
              <strong className="mr-auto">{repo.name}</strong>
            </Toast.Header>
            <Toast.Body>{repo.description || "No description"}</Toast.Body>
          </Toast>
        </div>
      ))}
    </div>
  );
};

export const SearchRepo: React.FC<IFavoriteRepositoriesProps> = (
  props: IFavoriteRepositoriesProps
) => {
  const { setFavorite } = useAuth();
  const changeRef = useRef<number>(0);
  const [options, setOptions] = useState<any>([]);

  const addFavorite = (
    value: OptionTypeBase | null,
    actionMeta: ActionMeta<OptionTypeBase>
  ) => {
    const { value: id, originalIndex: i } = value as ISearchOption;
    setFavorite((currState: IFavRepos) => {
      const updatedState = JSON.parse(JSON.stringify(currState));
      updatedState.byName[id] = props.repos[i];

      return updatedState;
    });
  };

  if (changeRef.current === 0) {
    const opts = props.repos.map((r, i) => ({
      value: r.id,
      label: r.name,
      originalIndex: i,
    }));

    setOptions(opts);
    changeRef.current = new Date().getTime();
  }

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        placeholder="Filter repositories..."
        value={null}
        onChange={addFavorite}
        isClearable
        isSearchable
        isDisabled={!options}
        name="color"
        options={options}
      />
    </>
  );
};
