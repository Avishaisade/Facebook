import React, { Component } from 'react';

class Avatar extends Component {
    render() {
        if (this.props.online) {
            return (
                <div className="userAvatarContainer">
                    <img className="Avatar" src={this.props.url} alt={this.props.fullname} />
                    <div className="onlineTag"></div>
                </div>
            );
        } else {
            return (
                <div className="userAvatarContainer">
                    <img className="Avatar" src={this.props.url} alt={this.props.fullname} />
                </div>
            );
        }
    }
}

export default Avatar;