import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Home from "./components/home/home";
import "../src/assets/css/login.css"
import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Route exact path="/" component={Home}></Route>
      <Route path="/signup" component={Signup}></Route>
      <Route path="/admin" component={Admin} />
      {/* <Route path="/rtl" component={RTL} /> */}
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
