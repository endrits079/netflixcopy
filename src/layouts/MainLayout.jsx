import React from "react";
import Index from "../pages/index/Index";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Movie from "../pages/movie/Movie";
import NotFound from "../pages/404/404";
import {Switch,Route} from 'react-router-dom';
import Header from '../components/header/Header';
export default function MainLayout() {
  return (
    <div>
      <Header></Header>

      <Switch>
        <Route path="/" exact component={Index}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/movie/:id" exact component={Movie}></Route>
        <Route path="/404" exact component={NotFound}></Route>
      </Switch>
    </div>
  );
}
