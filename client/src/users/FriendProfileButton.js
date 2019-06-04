import React, { Component } from "react";
import { friend, unfriend } from "./apiUser";

class FollowProfileButton extends Component {
    followClick = () => {
        this.props.onButtonClick(friend);
    };

    unfollowClick = () => {
        this.props.onButtonClick(unfriend);
    };

    render() {
        return (
            <div className="inline-block ">
                {!this.props.friending ? (
                    <button
                        onClick={this.friendClick}
                        className="btn"
                    >
                        <i className="userIcon_2 fb"></i> Add Friend
                    </button>
                ) : (
                        <button
                            onClick={this.unfriendClick}
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