import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./users/Signup";
import Signin from "./users/Signin";
import Header from "./core/Header";

const MainRouter = () => (
    <div>
        <Header />
       
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup/" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            </Switch>
  </div>
);


export default MainRouter;