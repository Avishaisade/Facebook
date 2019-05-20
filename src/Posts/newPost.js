import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { createPost } from "./apiPost";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../Images/defult_profile.jpg";
import Avatar from "../users/avatar";

// let photoUrl = DefaultProfile;
// if (isAuthenticated()) {
//     photoUrl = isAuthenticated().user._id
//         ? `${process.env.REACT_APP_API_URL}/users/${isAuthenticated().user._id}/photo${
//         isAuthenticated().user._id
//         }?${new Date().getTime()}`
//         : { DefaultProfile };
// }

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
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { body, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb",
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
                placeholder="What's on your mind?"
            />

        </form>
    );

    render() {
        const {
            body,
            photo,
            user,
            error,
            loading,
            redirectToProfile
        } = this.state;
        
        if (redirectToProfile) {
            return <Redirect to={`/users/${user._id}`} />;
        }
        return (
            <div className="fbTimelineComposerUnit clearfix-t">
                <div className="postMenu">
                    <div>
                        <a>
                            <span className="c_post">
                                <i className="icon"></i>
                                Create Post
                            </span>
                        </a>
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
                     _id={this.state.user._id}
                     name={this.state.user.name}
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
                        <li className="_right">
                            <button
                                className="btn"
                                onClick={this.clickSubmit}
                            >
                                <i className="icon approve"></i>
                                <span>Create Post</span>
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}

export default NewPost;