import React, { Component } from "react";
import {removePost, like, unlike } from "./apiPost";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Comment from "../comment/comment";
import UserHeader from "../users/userHeader";
import PostPhoto from "./postPhoto";


class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: "",
            postId:"",
            posterName:'',
            posterId:'',
            redirectToHome: false,
            redirectToSignin: false,
            like: false,
            likes: 0,
            comments: []
        };
    }

    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };

    componentDidMount = () => {
        const data = this.props.post;
             if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    postId:data._id,
                    post: data,
                    posterName:data.postedBy.name,
                    posterId:data.postedBy._id,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments: data.comments
                    
                });
            }
    };

    updateComments = comments => {
        this.setState({ comments });
    };

    likeToggle = () => {
        if (!isAuthenticated()) {
            this.setState({ redirectToSignin: true });
            return false;
        }
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;

        callApi(userId, token, postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
            }
        });
    };

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        removePost(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    deleteConfirmed = () => {
        let answer = window.confirm(
            "Are you sure you want to delete your post?"
        );
        if (answer) {
            this.deletePost();
        }
    };

    renderPost = post => {
        return (
            <div>
                {isAuthenticated().user &&
                    isAuthenticated().user._id === post.postedBy._id && (
                        <>
                            <label className="dropdown float-right">
                                <i className="userIcon_3 dots _block pointer"></i>
                                <input type="checkbox" className="dd-input" id="test" />
                                <ul className="dd-menu">
                                    <li>
                                        <Link
                                            to={`/post/edit/${post._id}`}
                                        >
                                        Edit Post
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                        onClick={this.deleteConfirmed}
                                        to={""}
                                        >
                                        Delete Post
                                        </Link>
                                    </li>
                                </ul>
                            </label>
                        </>
                    )}

                <UserHeader 
                     _id={post.postedBy._id}
                     name={post.postedBy.name}
                     created={post.created} 
                    />

                <div className="body">
                    {post.body}
                </div>

                <div className="post-pic">
                    {PostPhoto(this.state.postId)}
                </div>

                <div className="d-inline-block">
                   <div>
                        {isAuthenticated().user &&
                            isAuthenticated().user.role === "admin" && (
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Admin</h5>
                                        <p className="text">
                                            Edit/Delete as an Admin
                                        </p>
                                        <Link
                                        to={`/post/edit/${post._id}`}
                                        className="btn"
                                        >
                                        Update Post
                                        </Link>
                                        <button
                                        onClick={this.deleteConfirmed}
                                        className="btn"
                                         >
                                        Delete Post
                                        </button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        );
    };

    renderLikes = post => {
        const { like, likes } = this.state;

        return (
            <div className="_l pointer">
                {
                    like ? (
                        <span 
                            className="_likeTxt" 
                            onClick={this.likeToggle}
                        >
                            <i className="postsIcon like"></i>
                            {likes} Like
                    </span>
                    ) : (
                            <span 
                                onClick={this.likeToggle}>
                                <i className="postsIcon like"></i>
                                {likes} Like
                            </span>
                        )
                }
            </div>
        );
    };

    render() {
        // console.log(this.state.comments);
        const { post, redirectToHome, redirectToSignin,posterName, posterId, comments } = this.state;
        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }

        return (
            <div className="singlePost clearfix-t">

                {!post ? (
                    <div className="text">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                        this.renderPost(post)
                    )}

                <div className="_soc">
                    {this.renderLikes(post)}
                    <span className="_link _c pointer">
                        {
                            comments.length <= 0 ?
                                "Be the first one to comment" :
                                comments.length + " Comments"
                        }
                    </span>
                </div>

                <div className="_com_list">
                    <Comment
                        postId={post._id}
                        comments={comments.reverse()}
                        updateComments={this.updateComments}
                        posterName={posterName}
                        posterId= {posterId}
                        
                    />
                    {/* {console.log(post)} */}
                </div>
            </div>
        );
    }
}

export default SinglePost;