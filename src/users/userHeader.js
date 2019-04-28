import React, { Component } from 'react';
import Avatar from './avatar';
import UserInfo from './userInfo';
import TimeLabel from './timelabel';

class UserHeader extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
    }

    render() {
        const user = this.user;
        return (
            <div className="UserHead">
                <a href='https://google.com'>
                    <Avatar url={user.avatarPic} alt={user.firstName + " " + user.lastName} fullname={user.firstName + " " + user.lastName} online="true" />
                    <UserInfo fullname={user.firstName + " " + user.lastName} />
                    <TimeLabel dateAdded={Date.now()} />
                </a>
            </div>
        );
    }
}

export default UserHeader;