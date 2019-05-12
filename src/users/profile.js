import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import Cover from './cover';
import Avatar from './avatar';
import DeleteUser from "./DeleteUser";
import FriendProfileButton from "./FriendProfileButton";
import ProfileTabs from "./ProfileTabs";
import DefaultProfile from "../Images/defult_profile.jpg";
import { listByUser } from "../posts/apiPost";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: { friends: [] },
            redirectToSignin: false,
            friends: false,
            error: "",
            posts: []
        };
    }

    // check friend
    checkFriend = user => {
        const jwt = isAuthenticated();
        const match = user.friends.find(friend => {
            return friend._id === jwt.user._id;
        });
        return match;
    };

    clickFriendButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        callApi(userId, token, this.state.user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                this.setState({ user: data, friends: !this.state.friends });
            }
        });
    };

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                let friends = this.checkFriend(data);
                this.setState({ user: data, friends });
                this.loadPosts(data._id);
            }
        });
    };

    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    render() {
        const { redirectToSignin, user, posts } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />;

        const photoUrl = user._id
            ? `${process.env.REACT_APP_API_URL}/user/photo/${
            user._id
            }?${new Date().getTime()}`
            : { DefaultProfile };

        const coverPhotoUrl = user._id
            ? `${process.env.REACT_APP_API_URL}/user/coverPhoto/${
            user._id
            }?${new Date().getTime()}`
            : { DefaultProfile };

        return (
            <div className="container">
                <Cover
                    url={photoUrl}
                    coverUrl={coverPhotoUrl}
                    user={user} />
                {/* <Avatar
                    name={user.name}
                    url= {photoUrl}     
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                 /> */}
                <h2 className="1">Profile</h2>
                <div className="row">
                    {/* <div className="col">
                        <img
                            className="img-thumbnail"
                            src={photoUrl}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={user.name}
                        />
                    </div> */}

                    <div className="col">
                        <div className="lead ">
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(
                                user.created
                            ).toDateString()}`}</p>
                        </div>

                        {isAuthenticated().user &&
                            isAuthenticated().user._id === user._id ? (
                                <div className="1">
                                    <Link
                                        className="btn"
                                        to={`/post/create`}
                                    >
                                        Create Post
                                </Link>

                                    <Link
                                        className="btn "
                                        to={`/user/edit/${user._id}`}
                                    >
                                        Edit Profile
                                </Link>
                                    <DeleteUser userId={user._id} />
                                </div>
                            ) : (
                                <FriendProfileButton
                                    friends={this.state.friends}
                                    onButtonClick={this.clickFriendwButton}
                                />
                            )}

                        <div>
                            {isAuthenticated().user &&
                                isAuthenticated().user.role === "admin" && (
                                    <div class="1">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Admin
                                            </h5>
                                            <p className="text">
                                                Edit/Delete as an Admin
                                            </p>
                                            <Link
                                                className="btn"
                                                to={`/user/edit/${user._id}`}
                                            >
                                                Edit Profile
                                            </Link>
                                            <DeleteUser userId={user._id} />
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <hr />
                        <p className="lead">{user.about}</p>
                        <hr />

                        <ProfileTabs
                            friends={user.friends}
                            posts={posts}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;