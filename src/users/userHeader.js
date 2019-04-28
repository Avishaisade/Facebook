import React, { Component } from 'react';
import Avatar from './avatar';
import UserInfo from './userInfo';
import TimeLabel from './timelabel';

class UserHeader extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
    }
    // Get User data
    componentDidMount() {
        fetch('https://api.mydomain.com/users/XXX')
            .then(response => response.json())
            .then(data => this.user = { userId: data.userId, firstName: data.firstName, lastName: data.lastName, avatarUrl: data.avatarUrl });
    }

    render() {
        const user = this.user;
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