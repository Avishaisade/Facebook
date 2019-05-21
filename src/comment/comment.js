import React, { Component } from "react";
import { comment, uncomment } from "../posts/apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import UserHeader from "../users/userHeader";

class Comment extends Component {
    state = {
        text: "",
        error: ""
    };

    handleChange = event => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    };

    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({
                error:
                    "Comment should not be empty and less than 150 characters long"
            });
            return false;
        }
        return true;
    };

    addComment = e => {
        e.preventDefault();

        if (!isAuthenticated()) {
            this.setState({ error: "Please signin to leave a comment" });
            return false;
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;

            comment(userId, token, postId, { text: this.state.text }).then(
                data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        this.setState({ text: "" });
                        // dispatch fresh list of coments to parent (SinglePost)
                        this.props.updateComments(data.comments);
                    }
                }
            );
        }
    };

    deleteComment = comment => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.updateComments(data.comments);
            }
        });
    };

    deleteConfirmed = comment => {
        let answer = window.confirm(
            "Are you sure you want to delete your comment?"
        );
        if (answer) {
            this.deleteComment(comment);
        }
    };

    render() {
        const { comments } = this.props;
        const { error } = this.state;

        return (
            <div>

                <div>
                    {comments.map((comment, i) => (
                        <div key={i}>
                            <div>
                                <Link to={`/users/${comment.postedBy._id}`} />
                                <div>
                                    <p className="">
                                        <Link
                                            to={`/users/${comment.postedBy._id}`}
                                        >
                                            <UserHeader user={comment.postedBy} post={comment} />
                                            <div className="_comment_t">{comment.text}</div>
                                        </Link>
                                        {isAuthenticated().user &&
                                            isAuthenticated().user._id ===
                                            comment.postedBy._id && (
                                                <>
                                                    <span
                                                        onClick={() =>
                                                            this.deleteConfirmed(
                                                                comment
                                                            )
                                                        }
                                                        className="_linker mar_lr float-right t_sm"
                                                    >
                                                        Delete
                                                        </span>
                                                </>
                                            )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <form onSubmit={this.addComment}>
                        <div className="comment">
                            <input
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.text}
                                className="_comment_input"
                                placeholder="Write a comment..."
                            />
                            <button className="btn">
                                Post
                        </button>
                        </div>
                    </form>

                </div>

                <div
                    className="alert"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

            </div>
        );
    }
}

export default Comment;