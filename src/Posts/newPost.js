import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../Images/defult_profile.jpg";


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

            create(userId, token, this.postData).then(data => {
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

    newPostForm = ( body) => (
        <form>
            

            <div className="form-group">
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn"
            >
                Create Post
            </button>
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
            return <Redirect to={`/user/${user._id}`} />;
        }

        return (
            <div className="container">
                <img
                    style={{
                        borderRadius: "50%",
                        border: "1px solid black"
                    }}
                    className="float-left mr-2"
                    height="30px"
                    width="30px"
                    onError={i =>
                        (i.target.src = `${DefaultProfile}`)
                    }
                    src={`${
                        process.env.REACT_APP_API_URL
                    }/user/photo/${user._id}`}
                    alt={user.name}
                />
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
                {this.newPostForm(body)}
            </div>
        );
    }
}

export default NewPost;