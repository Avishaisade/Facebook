import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./users/Signup";
import Signin from "./users/Signin";
import Header from "./core/Header";
import Profile from "./users/profile";
import Users from "./users/Users";
import EditProfile from "./users/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import FindPeople from "./users/FindPeople";


const MainRouter = () => (
    <div>
        <Header />
       
            <Switch>
            <Route
                 exact 
                 path="/" 
                 component={Home} 
            />
            <Route 
                exact 
                path="/users" 
                component={Users} 
            />
            <Route 
                exact 
                path="/signup/" 
                component={Signup} 
            />
            <Route 
                exact 
                path="/signin" 
                component={Signin} 
            />
            <PrivateRoute
                exact
                path="/user/edit/:userId"
                component={EditProfile}
            />
            <PrivateRoute 
                exact 
                path="/findpeople" 
                component={FindPeople} />
            <PrivateRoute
                 exact 
                 path="/user/:userId" 
                 component={Profile}
            /> 
            </Switch>
  </div>
);


export default MainRouter;