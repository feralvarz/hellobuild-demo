import React, { createContext, useContext, useState } from "react";
import { IFavRepos } from "./components/FavoriteRepositories/FavoriteRepositories.types";
import { useGoogleIsAuthorized, usePersistLogin } from "./hooks/hooks";

interface IAuthContext {
  [key: string]: any;
}

const AuthContext = createContext<IAuthContext>({});

const AuthProvider = (props: any) => {
  const [userLoggedIn, setUserLogIn] = usePersistLogin();
  const [googleAuthorized, setGoogleAuthorized] = useGoogleIsAuthorized();
  const [favs, setFavorite] = useState<IFavRepos>({ byName: {} });

  const authContextValue = {
    userLoggedIn,
    setUserLogIn,
    googleAuthorized,
    setGoogleAuthorized,
    favs,
    setFavorite,
  };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
