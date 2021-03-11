import React, { createContext, useContext, useState, useEffect } from "react";
// import request from "superagent";

const AuthContext = createContext({});

const AuthProvider: React.FC = (props) => {
  const [ghAuthorized, setGHAuthorized] = useState(false);

  useEffect(() => {
    // get logged in state from github / read token
  }, []);

  const authContextValue = {};
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = useContext(AuthContext);

export { AuthProvider, useAuth };
