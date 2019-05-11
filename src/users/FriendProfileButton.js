import React, { Component } from "react";
import { friend, unfriend } from "./apiUser";

class FriendProfileButton extends Component {
    friendClick = () => {
        this.props.onButtonClick(friend);
    };

    unFriendClick = () => {
        this.props.onButtonClick(unfriend);
    };

    render() {
        return (
            <div className="1">
                {!this.props.friends ? (
                    <button
                        onClick={this.friendClick}
                        className="btn"
                    >
                       Add Friend
                    </button>
                ) : (
                    <button
                        onClick={this.unFriendClick}
                        className="btn "
                    >
                        unFriend
                    </button>
                )}
            </div>
        );
    }
}

export default FriendProfileButton;