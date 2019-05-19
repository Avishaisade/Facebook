import React, { Component } from "react";
import { singlePost } from "./apiPost";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class SinglePost extends Component {
    state = {
        post: "",
        redirectToHome: false,
        redirectToSignin: false,
        like: false,
        likes: 0,
        comments: []
    };
    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data,

                });
            }
        });
    };
    render() {
        const { post, redirectToHome, redirectToSignin, comments } = this.state;

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }

        return (
            <div className="singlePost clearfix-t">
                <h2 className="display">{post.title}</h2>

                {!post ? (
                    <div className="text">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                        this.renderPost(post)
                    )}


            </div>
        );
    }
}

export default SinglePost;


