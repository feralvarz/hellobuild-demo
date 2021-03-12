import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { GithubCallback } from "./components/GithubCallback/GithubCallback";
import { Signup } from "./components/Signup/Signup";
import { Login } from "./components/Login/Login";
import { Profile } from "./components/Profile/Profile";
import { GoogleCallback } from "./components/GoogleCallback/GoogleCallback";

const App: React.FC = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/github/oauth2callback" component={GithubCallback} />
        <Route path="/calendar/oauth2callback" component={GoogleCallback} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
