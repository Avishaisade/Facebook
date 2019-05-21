import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import Avatar from "../users/avatar";

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };
}

// const friends= isAuthenticated().user.following.concat(isAuthenticated().user.followers)
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

                    <Link className="" style={isActive(history, "/")} to="/">
                        <div className="fb-logo"></div>
                    </Link>
                    <div className="searchBox">
                        <input type="text" placeholder="Search"></input>
                        <button className="search-btn-wrapper" placeholdertext="Search" type="submit"><i className="search-icon"></i></button>
                    </div>

                    {/* Navigation - Right */}
                    <div className="float-right r_menu">
                        {isAuthenticated() && (
                            <>
                                <div className="item">
                                    <label className="dropdown pointer">
                                        <i className="i arrow _block opacity-low"></i>
                                        <input type="checkbox" className="dd-input" id="test" />
                                        <ul className="dd-menu">
                                            <li>
                                                <Link onClick={() => signout(() => history.push("/"))}>Log Out</Link>
                                            </li>
                                            <li>
                                                {/* <Link
                                to={`/findpeople`}
                                style={isActive(history, `/findpeople`)}
                                className=""
                            >
                                Find People
                            </Link> */}
                                            </li>
                                        </ul>
                                    </label>
                                </div>
                            </>
                        )}
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
                                <Avatar _id={isAuthenticated().user._id} name={`${isAuthenticated().user.name}`} />
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

