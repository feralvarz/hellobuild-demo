import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { GithubCallback } from "./components/GithubCallback/GithubCallback";
import { Signup } from "./components/Signup/Signup";
import { Login } from "./components/Login/Login";

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/github/oauth2callback" component={GithubCallback} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("root")
);
