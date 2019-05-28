import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { createPost } from "./apiPost";
import { Redirect } from "react-router-dom";
import Avatar from "../users/avatar";
class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user, redirectToProfile: false });
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
        this.props.handlePost(true)
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
                placeholder="What's on your mind?"
            />

        </form>
    );

    render() {
        const {
            body,
            user,
            loading,
            redirectToProfile
        } = this.state;

        if (redirectToProfile && this.props.Redirect === true) {
            return <Redirect to={`/users/${user._id}`} />;
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

                <div className="_1col">
                    <Avatar
                        _id={this.state.user._id}
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
                            {loading ? (<span>Loading</span>) : (
                                <button
                                    className="btn-s"
                                    onClick={this.clickSubmit}
                                >
                                    <span>Create Post</span>
                                </button>)}
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}

export default NewPost;