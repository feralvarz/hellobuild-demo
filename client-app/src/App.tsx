import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GithubCallback } from "./components/GithubCallback/GithubCallback";
import { GoogleCallback } from "./components/GoogleCallback/GoogleCallback";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { PrivateRoute } from "./routes/PrivateRoute";
import { useAuth } from "./AuthContext";
import { Repositories } from "./components/Repositories/Repositories";
import { CalendarEvents } from "./components/CalendarEvents/CalendarEvents";

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
          path="/events"
          component={CalendarEvents}
        />
        <PrivateRoute
          allowWhen={authorized}
          exact
          path="/github"
          component={Repositories}
        />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Repositories} />
      </Switch>
    </Router>
  );
};

export default App;
