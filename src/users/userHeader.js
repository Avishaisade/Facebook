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
        user.avatarPic = user.avatarPic ? user.avatarPic : "https://i.pinimg.com/236x/d9/d1/3f/d9d13f399d9611c5c26f12545759162e--fb-profile-facebook-profile.jpg";
        user.firstName = user.name;
        user.lastName = user.name;
        return (
            <div className="UserHead">
                <a href='/user'>
                    <Avatar url={user.avatarPic} alt={user.firstName + " " + user.lastName} fullname={user.firstName + " " + user.lastName} online="true" />
                    <UserInfo fullname={user.firstName + " " + user.lastName} />
                    <TimeLabel dateAdded={Date.now()} />
                </a>
            </div>
        );
    }
}

export default UserHeader;