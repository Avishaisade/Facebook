import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };
}


const Header = ({history}) => (
    <div>
        <div className="header-fb">
            <div className="inner-container">
            <Link
                className=""
                style={isActive(history, "/")}
                to="/"
            >
                Home
            </Link>
            {/* <Link
                className=""
                style={isActive(history, "/users")}
                to="/users"
            >
                Users
            </Link> */}
            {/* <Link
                className=""
                style={isActive(history, `/post/create`)}
                to={`/post/create`}
            >
                Create Post
            </Link> */}

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

                    <Link
                        to={`/user/${isAuthenticated().user._id}`}
                        style={isActive(
                            history,
                            `/user/${isAuthenticated().user._id}`
                        )}
                    >
                        {`${isAuthenticated().user.name}`}
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


                <div className="fb-logo"></div>
                <div className="searchBox">
                    <button className="search-btn-wrapper" placeholdertext="Search" type="submit"><i className="search-icon"></i></button>
                </div>
        </div>
    </div>
    
  </div>
);
export default withRouter(Header);


