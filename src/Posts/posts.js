import React, { Component } from "react";
import { list } from "./apiPost";
// import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import UserHeader from "../users/userHeader";
// import DefaultProfile from "../Images/defult_profile.jpg";
import moment from 'moment';
import SinglePost from './SinglePost';

=======
>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
<<<<<<< HEAD
        };
    }

    loadPosts =() => {
        list().then(data => {
=======
            page: 1
        };
    }

    loadPosts = page => {
        list(page).then(data => {
>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
<<<<<<< HEAD
        this.loadPosts(this.state.posts);
    }

=======
        this.loadPosts(this.state.page);
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };

    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };

>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
    renderPosts = posts => {
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";

                    return (
                        <div className="card" key={i}>
                            <div className="card-body">
<<<<<<< HEAD
                                <UserHeader
                                    _id= {posterId}
                                    name= {posterName}
                                    />
                                <span className="timeLabel">
                                    {moment(post.created).startOf('minute').fromNow()}
                                </span>
=======
                                {/* <img
                                    src={`${
                                        process.env.REACT_APP_API_URL
                                    }/post/photo/${post._id}`}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${DefaultPost}`)
                                    }
                                    className="img-thunbnail"
                                    style={{ height: "200px", width: "100%" }}
                                /> */}
                                <h5 className="card-title">{post.title}</h5>
>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
                                <p className="card-text">
                                    {post.body.substring(0, 100)}
                                </p>
                                <br />
                                <p className="1">
<<<<<<< HEAD
                                  
=======
                                    Posted by{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                                    on {new Date(post.created).toDateString()}
>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn"
                                >
                                    Read more
                                </Link>
<<<<<<< HEAD

=======
>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
<<<<<<< HEAD
        const { posts} = this.state;
        return (
            <div className="container">
                
                {this.renderPosts(posts)}

               
=======
        const { posts, page } = this.state;
        return (
            <div className="container">
                <h2 className="mt">
                    {/* {!posts.length ? "No more posts!" : "Recent Posts"} */}
                </h2>

                {this.renderPosts(posts)}

                {page > 1 ? (
                    <button
                        className="btn"
                        onClick={() => this.loadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                    ""
                )}

                {posts.length ? (
                    <button
                        className="btn5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                    ""
                )}
>>>>>>> b13d7e46a26203cdaf64209c5d9e60f68dabbc7d
            </div>
        );
    }
}

export default Posts;