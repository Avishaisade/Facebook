import React, { Component } from "./node_modules/react";
import {listOfUsers } from "./apiPost";
// import DefaultPost from "../images/mountains.jpg";
import { Link } from "./node_modules/react-router-dom";
import UserHeader from "../users/userHeader";
// import DefaultProfile from "../Images/defult_profile.jpg";
import moment from './node_modules/moment';
import SinglePost from './SinglePost';


class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
        };
    }

    loadPosts =() => {
        listOfUsers().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
        this.loadPosts(this.state.posts);
    }

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
                                <UserHeader
                                    _id= {posterId}
                                    name= {posterName}
                                    />
                                <span className="timeLabel">
                                    {moment(post.created).startOf('minute').fromNow()}
                                </span>
                                <p className="card-text">
                                    {post.body.substring(0, 100)}
                                </p>
                                <br />
                                <p className="1">
                                  
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn"
                                >
                                    Read more
                                </Link>

                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts} = this.state;
        return (
            <div className="container">
                
                {this.renderPosts(posts)}

               
            </div>
        );
    }
}

export default Posts;