import React from "react";
import "./App.scss";
import Watch from "./pages/watch-movie/Watch";
import { Switch, Route} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
function App() {
 console.log('Inside App');
  return (
    <div className="app">
      <Switch>
        <Route path="/watch/:id" exact component={Watch}></Route>
        <Route path="/" component={MainLayout}></Route>
      </Switch>
    </div>
  );
}

export default App ;
