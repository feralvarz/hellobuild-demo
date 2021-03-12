import React, { createContext, useContext, useState } from "react";
import {
  useGithubAuthorized,
  useGoogleIsAuthorized,
  useLogin,
} from "./hooks/hooks";
interface IAuthContext {
  [key: string]: any;
}
interface IRepoLangs {
  name: string;
  color: string;
}

export interface IRepo {
  id: string;
  nameWithOwner: string;
  description: string;
  name: string;
  languages: {
    totalCount: number;
    nodes: IRepoLangs[];
  };
}
interface FavByName {
  [key: string]: IRepo;
}
export interface IFavRepos {
  byName: FavByName | {};
}

const AuthContext = createContext<IAuthContext>({});

const AuthProvider = (props: any) => {
  const [userLoggedIn, setUserLogIn] = useLogin();
  const [ghAuthorized, setGHAuthorized] = useGithubAuthorized();
  const [googleAuthorized, setGoogleAuthorized] = useGoogleIsAuthorized();
  const [favs, setFavorite] = useState<IFavRepos>({ byName: {} });

  const authContextValue = {
    userLoggedIn,
    setUserLogIn,
    ghAuthorized,
    setGHAuthorized,
    googleAuthorized,
    setGoogleAuthorized,
    favs,
    setFavorite,
  };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
