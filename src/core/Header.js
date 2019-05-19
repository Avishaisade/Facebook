import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import DefaultProfile from "../Images/defult_profile.jpg";

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };
}


let photoUrl = DefaultProfile;
if (isAuthenticated()) {
    photoUrl = isAuthenticated().user._id
        ? `${process.env.REACT_APP_API_URL}/user/photo/${
        isAuthenticated().user._id
        }?${new Date().getTime()}`
        : { DefaultProfile };
}

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
                            {/* <Link
                                to={`/findpeople`}
                                style={isActive(history, `/findpeople`)}
                                className=""
                            >
                                Find People
<<<<<<< HEAD
                            </Link> */}
=======
                    </Link>
>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d

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
                    <Link className="" style={isActive(history, "/")} to="/">
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
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(
                                history,
                                `/user/${isAuthenticated().user._id}`
                            )}
                        >
                            <span className="s-1">
                                <img
                                    className="img-thumbnail"
                                    src={photoUrl}
                                    onError={i => (i.target.src = `${DefaultProfile}`)}
                                    alt={isAuthenticated().user.name}
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


