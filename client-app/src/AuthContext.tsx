import React, { createContext, useContext } from "react";
import {
  useGithubAuthorized,
  useGoogleIsAuthorized,
  useLogin,
} from "./hooks/hooks";
interface IAuthContext {
  [key: string]: any;
}

const AuthContext = createContext<IAuthContext>({});

const AuthProvider = (props: any) => {
  const [userLoggedIn, setUserLogIn] = useLogin();
  const [ghAuthorized, setGHAuthorized] = useGithubAuthorized();
  const [googleAuthorized, setGoogleAuthorized] = useGoogleIsAuthorized();
  const authContextValue = {
    userLoggedIn,
    setUserLogIn,
    ghAuthorized,
    setGHAuthorized,
    googleAuthorized,
    setGoogleAuthorized,
  };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
