import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { createPost } from "./apiPost";
import { Redirect } from "react-router-dom";
import Avatar from "../users/avatar";


class PostOnFriends extends Component {
    constructor() {
        super();
        this.state = {
            body: "",
            photo: "",
            error: "",
            poster: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false,
            profileUser: {}

        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({
            poster: isAuthenticated().user,

        });
    }
    componentWillReceiveProps(props) {
        const user = props.user;
        this.setState({ profileUser: user });
    }

    isValid = () => {
        const { fileSize } = this.state;
        if (fileSize > 500000) {
            this.setState({
                error: "File size should be less than 500kb",
                loading: false
            });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            createPost(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        body: "",
                        redirectToProfile: true
                    });
                }
            });
        }
    };

    newPostForm = (body) => (
        <form>

            <textarea
                onChange={this.handleChange("body")}
                type="text"
                className="c_post_txt"
                value={body}
                placeholder={`Write somthing on ${this.state.profileUser.name}'s wall`}
            />

        </form>
    );

    render() {
        const {
            body,
            poster,
            loading,
            redirectToProfile,
            profileUser
        } = this.state;
        // console.log(this.state);

        if (redirectToProfile) {
            return <Redirect to={`/users/${profileUser._id}`} />;
        }
        return (
            <div className="fbTimelineComposerUnit clearfix-t">
                <div className="postMenu">
                    <div>
                        <Link to={`/`}>
                            <span className="c_post">
                                <i className="icon"></i>
                                Create Post
                            </span>
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="text">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                        ""
                    )}

                <div className="_1col">
                    <Avatar
                        _id={poster._id}
                    />
                </div>
                <div className="_2col">
                    {this.newPostForm(body)}
                </div>

                <div className="footer">
                    <ul>
                        <li>
                            <div className="btn">
                                <i className="icon pic"></i>
                                <span>Photo/Video</span>

                                <input
                                    onChange={this.handleChange("photo")}
                                    type="file"
                                    accept="image/*"
                                />
                            </div>
                        </li>
                        <li className="_right mr-0">
                            <button
                                className="btn-s"
                                onClick={this.clickSubmit}
                            >
                                <span>Publish</span>
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}

export default PostOnFriends;