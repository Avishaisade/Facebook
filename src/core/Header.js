import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import Avatar from "../users/avatar";

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };
}

// const friends= isAuthenticated().user.following.concat(isAuthenticated().user.followers)
console.log(isAuthenticated())
const Header = ({ history }) => (
    <div>
        {isAuthenticated() && (
            <div className="header-fb">
                <div className="inner-container">

                    {!isAuthenticated() && (
                        <>
                            <Link
                                className=""
                                style={isActive(history, "/signin")}
                                to="/signin"
                            >
                                Sign In
                        </Link>
                            <Link
                                className=""
                                style={isActive(history, "/signup")}
                                to="/signup"
                            >
                                Sign Up
                        </Link>
                        </>
                    )}
                    {isAuthenticated() && (
                        <>
                            <Link
                                to={`/findpeople`}
                                style={isActive(history, `/findpeople`)}
                                className=""
                            >
                                Find People
                            </Link>

                            <span
                                className=""
                                style={
                                    (isActive(history, "/signup"),
                                        { cursor: "pointer", color: "#fff" })
                                }
                                onClick={() => signout(() => history.push("/"))}
                            >
                                Sign Out
                    </span>

                        </>
                    )}
                    <Link className="" 
                        style={isActive(history, "/")} 
                        to="/">
                        <div className="fb-logo"></div>
                    </Link>
                    <div className="searchBox">
                        <input type="text" placeholder="Search"></input>
                        <button className="search-btn-wrapper" placeholdertext="Search" type="submit"><i className="search-icon"></i></button>
                    </div>

                    {/* Navigation - Right */}
                    <div className="float-right r_menu">
                        <div className="item">
                            <div className="i arrow opacity-low"></div>
                        </div>
                        <div className="item">
                            <div className="i question opacity-low"></div>
                        </div>
                    </div>
                    <div className="float-right r_menu">
                        <div className="item">
                            <div className="i notif opacity-low"></div>
                        </div>
                        <div className="item">
                            <div className="i msg opacity-low"></div>
                        </div>
                        <div className="item">
                            <div className="i ff opacity-low"></div>
                        </div>
                    </div>
                    <div className="float-right r_menu">
                        <Link
                            to={`/users/${isAuthenticated().user._id}`}
                            style={isActive(
                                history,
                                `/users/${isAuthenticated().user._id}`
                            )}
                        >
                            <span className="s-1">
                            <Avatar
                              _id={isAuthenticated().user._id}  
                            />
                                {`${isAuthenticated().user.name}`}
                            </span>
                        </Link>

                        <Link
                            to={`/`}
                            className=""
                            style={isActive(history, `/`)}
                        >
                            <span className="s-1">Home</span>
                        </Link>

                        <Link
                            className=""
                            style={isActive(history, `/post/create`)}
                            to={`/post/create`}
                        >
                            <span className="s-1">Create</span>
                        </Link>

                    </div>
                </div>
            </div>
        )}
    </div>
);
export default withRouter(Header);

