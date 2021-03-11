import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { GithubCallback } from "./components/GithubCallback/GithubCallback";

ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/github/oauth2callback" component={GithubCallback} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("root")
);
