import React, { Component } from "react";
<<<<<<< HEAD
import { singlePost, remove, like, unlike } from "./apiPost";
// import DefaultPost from "../images/";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Comment from "../comment/comment";

class SinglePost extends Component {
    constructor(props) {
        super(props);
    this.state = {
=======
import { singlePost} from "./apiPost";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class SinglePost extends Component {
    state = {
>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
        post: "",
        redirectToHome: false,
        redirectToSignin: false,
        like: false,
        likes: 0,
        comments: []
    };
<<<<<<< HEAD
    
    }

    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };
    

    componentDidMount = () => {
        const postId = this.props.postId
=======
    componentDidMount = () => {
        const postId = this.props.match.params.postId;
>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data,
<<<<<<< HEAD
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments: data.comments
                });
            }
        });
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
=======
                   
>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
                });
            }
        });
    };
<<<<<<< HEAD

    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
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
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : " Unknown";

        const { like, likes } = this.state;

        return (
            <div className="card-body">
                
                {like ? (
                    <h3 onClick={this.likeToggle}>
                        <img  
                            src="https://img.icons8.com/windows/32/000000/facebook-like.png" 
                            alt="like"
                        />{" "}
                        {likes} Like
                    </h3>
                ) : (
                    <h3 onClick={this.likeToggle}>
                       <img  
                            src="https://img.icons8.com/windows/32/000000/facebook-like.png" 
                            alt="like"
                        />{" "}

                        {likes} Like
                    </h3>
                )}

                <p className="card-text">{post.body}</p>
                <br />
                <p className="font-italic mark">
                    Posted by <Link to={`${posterId}`}>{posterName} </Link>
                    on {new Date(post.created).toDateString()}
                </p>
                <div className="d-inline-block">

                    {isAuthenticated().user &&
                        isAuthenticated().user._id === post.postedBy._id && (
                            <>
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
                            </>
                        )}

                    <div>
                        {isAuthenticated().user &&
                            isAuthenticated().user.role === "admin" && (
                                <div class="card">
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

    render() {
        const { post, redirectToHome, redirectToSignin, comments } = this.state;
=======
    render() {
        const { post, redirectToHome, redirectToSignin, comments } = this.state;

>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }

        return (
            <div className="container">
<<<<<<< HEAD
=======
                <h2 className="display">{post.title}</h2>

>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
                {!post ? (
                    <div className="text">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    this.renderPost(post)
                )}

<<<<<<< HEAD
                <Comment
                    postId={post._id}
                    comments={comments.reverse()}
                    updateComments={this.updateComments}
                />
=======
                
>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
            </div>
        );
    }
}

<<<<<<< HEAD
export default SinglePost;
=======
export default SinglePost;


>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
