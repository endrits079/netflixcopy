import React from "react";
import Register from "./pages/auth/Register";
import Login from './pages/auth/Login';
import { Switch, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/login" exact component={Login}></Route>
      </Switch>
    </div>
  );
}
