import React from "react";
import "./App.scss";

import Watch from "./pages/watch-movie/Watch";
import { Switch, Route, withRouter } from "react-router-dom";
import Header from "./components/header/Header";
import MainLayout from "./layouts/MainLayout";
function App(props) {
  let route = props.location.pathname;
  route = route.split("/");

  return (
    <div className="app">
      <Switch>
        <Route path="/watch/:id" exact component={Watch}></Route>
        <Route path="/" component={MainLayout}></Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
