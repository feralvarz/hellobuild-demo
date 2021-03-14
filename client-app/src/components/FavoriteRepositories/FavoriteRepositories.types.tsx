import { OptionTypeBase } from "react-select";
import { IRepo } from "../Repositories/Repo";

export interface IFavoriteRepositoriesProps {
  repos: any[];
}

export interface ISearchOption extends OptionTypeBase {
  originalIndex: number;
}

interface FavByName {
  [key: string]: IRepo;
}

export interface IFavRepos {
  byName: FavByName | {};
}
