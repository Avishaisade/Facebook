import React, { Component, Suspense } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { listByUser } from "../Posts/apiPost";
import Cover from './cover';
import { getUsersbyId } from "./apiUser";
import NewPost from "../Posts/newPost";
import FriendsTab from "./userFriendsTab";
import SinglePost from "../Posts/SinglePost";
import PostOnFriends from "../Posts/PostOnFriends";
import Loader from "../widgets/loader";
const UserDetails = React.lazy(() => import("./userDetails"));


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: { friends: [] },
            redirectToSignin: false,
            friends: false,
            error: "",
            posts: [],
            userProfile: false,
            loaded: false,
            postloded: false
        };
        this.updatePosts = this.updatePosts.bind(this);
    }
    
    updatePosts = posts => {
        this.setState({ posts });
    };

    handlePost(value) {
        this.setState(prevState => {
          return {
            postloded: true
          };
        });
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
                this.setState({ user: data, frienda: !this.state.friends });
            }
        });
    };

    init = userId => {
        getUsersbyId(userId).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                let friends = this.checkFriend(data);
                this.setState({ user: data, friends, loaded: true });
                this.loadPosts(data._id);
                this.checkprofile(data._id);
            }
        });
    };

    loadPosts = userId => {
        listByUser(userId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };
   

    checkprofile = id => {
        const posterId = isAuthenticated().user._id;
        if (id === posterId) {
            this.setState({ userProfile: true });
        }
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
        // if (this.state.postloded === true) return this.loadPosts(this.state.user._id);
        return (
            <div className="globalContainer">
                {this.state.loaded && (
                    < Cover
                        user={user}
                    />
                )}

                <div className="col-320 float-left">
                    {this.state.loaded && (
                        <Suspense fallback={<Loader />}>
                            {/* Details Tab */}
                            <UserDetails
                                user={user}
                            />
                            {/* Friends Tab */}
                            <FriendsTab
                                friends={user.friends}
                                
                            />
                        </Suspense>
                    )}
                </div>

                <div className="col-530 float-right">
                    {this.state.user && this.state.userProfile ?
                        <NewPost 
                            handlePost={this.handlePost}
                        /> :
                        <PostOnFriends
                            user={this.state.user}
                        />

                    }
                    {/* Posts */}
                    {posts.map((post, i) => (
                        <div key={i}>
                            <SinglePost
                                post={post}
                                updatePosts={this.updatePosts}
                            />
                            {console.log(post)}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Profile;