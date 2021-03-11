import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
