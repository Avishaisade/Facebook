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
        <Switch>
            <Route
                exact
                path="/"
                component={Home}
            >
                <Header />
            </Route>
            <Route
                exact
                path="/users"
                component={Users}
            >
                <Header />
            </Route>
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
            >
                <Header />
            </PrivateRoute>
            <PrivateRoute
                exact
                path="/findpeople"
                component={FindPeople}
            >
                <Header />
            </PrivateRoute>
            <PrivateRoute
                exact
                path="/user/:userId"
                component={Profile}
            >
                <Header />
            </PrivateRoute>
        </Switch>
    </div>
);


export default MainRouter;