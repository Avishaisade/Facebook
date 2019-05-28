import React, { Component } from "react";
import { Link } from "react-router-dom";
import { singlePost, updatePost } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import PostPhoto from "./postPhoto";
import Avatar from "../users/avatar";


class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            body: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            loading: false
        };
    }

    init = postId => {
        singlePost(postId).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data.postedBy._id,
                    body: data.body,
                    error: ""
                });
            }
        });
    };

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
    }

    isValid = () => {
        const { body, fileSize } = this.state;
        if (fileSize > 5000000) {
            this.setState({
                error: "File size should be less than 500kb",
                loading: false
            });
            return false;
        }
        if (body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
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
            const postId = this.props.match.params.postId;
            const token = isAuthenticated().token;

            updatePost(postId, token, this.postData).then(data => {
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

    editPostForm = (body) => (
        <div className="_2col">
            <form>
                <div className="form-group">
                    <textarea
                        onChange={this.handleChange("body")}
                        type="text"
                        className="c_post_txt"
                        value={body}
                    />
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
                            {this.state.loading ? (<span>Loading</span>) : (
                                <button
                                    className="btn-s"
                                    onClick={this.clickSubmit}
                                >
                                    <span>Edit Post</span>
                                </button>)}
                        </li>
                    </ul>
                </div>
            </form>

        </div>
    );

    render() {
        const {
            id,
            body,
            redirectToProfile,
            error,
            loading
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/users/${isAuthenticated().user._id}`} />;
        }

        return (
            <div className="col-530 float-right fbTimelineComposerUnit clearfix-t">
                <div
                    className="postMenu"
                >
                    <div>
                        <Link to={`/`}>
                            <span className="c_post">
                                <i className="icon"></i>
                                Edit Post
                            </span>
                        </Link>
                    </div>
                    {error}
                </div>
                <div className="_1col">

                </div>

                {PostPhoto(id)}

                {/* <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={`${
                        process.env.REACT_APP_API_URL
                    }/post/photo/${id}?${new Date().getTime()}`}
                    onError={i => (i.target.src = `${DefaultPost}`)}
                    alt={title}
                /> */}

                {isAuthenticated().user.role === "admin" &&
                    this.editPostForm(body)}

                {isAuthenticated().user._id === id &&
                    this.editPostForm(body)}
            </div>
        );
    }
}

export default EditPost;