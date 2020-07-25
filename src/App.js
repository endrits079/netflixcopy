import React from "react";
import Register from "./pages/register/Register";
import { Switch, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/register" exact component={Register}></Route>
      </Switch>
    </div>
  );
}
