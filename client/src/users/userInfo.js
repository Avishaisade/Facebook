import React, { Component } from 'react';

class UserInfo extends Component {
    render() {
        return (
            <span className="UserInfo">{this.props.fullname}</span>
        );
    }
}

export default UserInfo;