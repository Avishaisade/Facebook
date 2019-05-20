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
import Footer from "./core/Footer";
import NewPost from "./posts/newPost";
import EditPost from "./posts/EditPost";
import SinglePost from "./posts/SinglePost";

const MainRouter = () => (
    <div>
        <Header />
        <Switch>
            <PrivateRoute
                exact
                path="/"
                component={Home}
            />
            <PrivateRoute 
                exact 
                path="/post/create" 
                component={NewPost} 
            />

            <Route
                 exact 
                 path="/post/:postId" 
                 component={SinglePost} 
            />
            {/* <Route
                 exact 
                 path="/post/:postId" 
                 component={SinglePost} 
            /> */}

            <PrivateRoute
                exact
                path="/post/edit/:postId"
                component={EditPost}
            />
            <PrivateRoute
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
                component={FindPeople}
            />
            <PrivateRoute
                exact
                path="/users/:userId"
                component={Profile}
            />
        </Switch>
        <Footer />
    </div>
);


export default MainRouter;