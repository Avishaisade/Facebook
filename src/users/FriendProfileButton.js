import React, { Component } from "react";
import { follow, unfollow } from "./apiUser";

class FollowProfileButton extends Component {
    followClick = () => {
        this.props.onButtonClick(follow);
    };

    unfollowClick = () => {
        this.props.onButtonClick(unfollow);
    };

    render() {
        return (
            <div className="1">
                {!this.props.following ? (
                    <button
                        onClick={this.followClick}
                        className="btn"
                    >
                        Add Friend
                    </button>
                ) : (
                    <button
                        onClick={this.unfollowClick}
                        className="btn"
                    >
                        UnFriend
                    </button>
                )}
            </div>
        );
    }
}

export default FollowProfileButton;