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
            <PrivateRoute
                exact
                path="/"
                render={props =>
                    <div>
                        <Header />
                        <Home />
                    </div>
                }
            />
            <PrivateRoute
                exact
                path="/users"
                render={props =>
                    <div>
                        <Header />
                        <Users />
                    </div>
                }
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
                render={props =>
                    <div>
                        <Header />
                        <EditProfile />
                    </div>
                }
            />
            <PrivateRoute
                exact
                path="/findpeople"
                component={FindPeople}
                render={props =>
                    <div>
                        <Header />
                        <FindPeople />
                    </div>
                }
            />
            <PrivateRoute
                exact
                path="/user/:userId"
                component={Profile}
                render={props =>
                    <div>
                        <Header />
                        <Profile />
                    </div>
                }
            />
        </Switch>
    </div>
);


export default MainRouter;