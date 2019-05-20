import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";


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

            update(postId, token, this.postData).then(data => {
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
        <form>
            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Update Post
            </button>
        </form>
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
            <div className="container">
                <div
                    className="alert"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="text">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

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