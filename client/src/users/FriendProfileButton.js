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
            <div className="inline-block ">
                {!this.props.following ? (
                    <button
                        onClick={this.followClick}
                        className="btn"
                    >
                        <i className="userIcon_2 fb"></i> Add Friend
                    </button>
                ) : (
                        <button
                            onClick={this.unfollowClick}
                            className="btn"
                        >
                            <i className="userIcon_2 fb"></i> Unfriend
                    </button>
                    )}
            </div>
        );
    }
}

export default FollowProfileButton;