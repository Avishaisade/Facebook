import React, { Component } from 'react';
import Avatar from './avatar';
import UserInfo from './userInfo';
import TimeLabel from './timelabel';

class UserHeader extends Component {
    // Get Avatar URL
    componentDidMount() {
        fetch('https://api.mydomain.com/users/XXX')
            .then(response => response.json())
            .then(data => this.user = { userId: data.userId, firstName: data.firstName, lastName: data.lastName, avatarUrl: data.avatarUrl });
    }

    render() {
        const user = {
            userId: null,
            firstName: "Osher",
            lastName: "Levy",
            avatarUrl: "https://i.pinimg.com/originals/45/d9/8a/45d98aa922bef6b5213b488dc36a8764.png"
        };

        return (
            <div className="UserHead">
                <a href='https://google.com'>
                    <Avatar url={user.avatarUrl} alt={user.firstName + " " + user.lastName} online="true" />
                    <UserInfo fullname={user.firstName + " " + user.lastName} />
                    <TimeLabel dateAdded={Date.now()} />
                </a>
            </div>
        );
    }
}

export default UserHeader;