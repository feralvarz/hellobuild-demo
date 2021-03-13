import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GithubCallback } from "./components/GithubCallback/GithubCallback";
import { GoogleCallback } from "./components/GoogleCallback/GoogleCallback";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Profile } from "./components/Profile/Profile";
import { Signup } from "./components/Signup/Signup";
import { PrivateRoute } from "./routes/PrivateRoute";
import { useAuth } from "./AuthContext";

const App = () => {
  const { userLoggedIn } = useAuth();
  const authorized = userLoggedIn?.data?.authorized;

  return (
    <Router>
      <Switch>
        <PrivateRoute
          allowWhen={authorized}
          path="/github/oauth2callback"
          component={GithubCallback}
        />
        <PrivateRoute
          allowWhen={authorized}
          path="/calendar/oauth2callback"
          component={GoogleCallback}
        />
        <PrivateRoute
          allowWhen={authorized}
          exact
          path="/profile"
          component={Profile}
        />
        <PrivateRoute allowWhen={authorized} exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
