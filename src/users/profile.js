import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { listByUser } from "../Posts/apiPost";
import Cover from './cover';
import DeleteUser from "./DeleteUser";
import FriendProfileButton from "./FriendProfileButton";
import { getUsersbyId } from "./apiUser";
import NewPost from "../Posts/newPost";
import UserDetails from "./userDetails";
import FriendsTab from "./userFriendsTab";
import SinglePost from "../Posts/SinglePost";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: "",
            posts: []
        };
    }

    // check friend
    checkFriend = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id;
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
                this.setState({ user: data, following: !this.state.following });
            }
        });
    };
    // read
    init = userId => {
        const token = isAuthenticated().token;
        getUsersbyId(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                let following = this.checkFriend(data);
                this.setState({ user: data, following });
                this.loadPosts(data._id);
            }
        });
    };

    // listByUser
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

        return(
            <div className="globalContainer">
                {/* Cover Area */}
                <Cover                  
                    user={user}
                />

                <div className="col-320 float-left">
                    {/* Details Tab */}
                    <UserDetails 
                        user={user} 
                    />
                    {/* Friends Tab */}
                    <FriendsTab
                        followers={user.followers} 
                        following={user.following} 
                     />
                </div>

                <div className="col-530 float-right">
                <NewPost />
                    {/* Posts */}
                    {posts.map((post, i) => (
                        <div key={i}>
                            
                            <SinglePost
                                postId={[post._id]}
                            />
                        </div>
                    ))}
                </div>

                <div className="row">

                    <div className="col">

                        {isAuthenticated().user &&
                            isAuthenticated().user._id === user._id ? (
                                <div className="1">
                                    {/* Post Creation */}
                                    
                                    <DeleteUser 
                                        userId={user._id} 
                                    />
                                </div>
                            ) : (
                                <FriendProfileButton
                                    following={this.state.following}
                                    onButtonClick={this.clickFriendButton}
                                />
                            )}

                        <div>
                            {isAuthenticated().user &&
                                isAuthenticated().user.role === "admin" && (
                                    <div className="1">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Admin
                                            </h5>
                                            <p className="text">
                                                Edit/Delete as an Admin
                                            </p>
                                            <Link
                                                className="btn"
                                                to={`/users/${user._id}`}
                                            >
                                                Edit Profile
                                            </Link>
                                            <DeleteUser
                                                userId={user._id}
                                            />
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;