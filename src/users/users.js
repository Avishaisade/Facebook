import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            fullname: "Avishai Sade",
            avatarUrl: "https://i.pinimg.com/originals/45/d9/8a/45d98aa922bef6b5213b488dc36a8764.png"
        };
    }

    // Get Avatar URL
    componentDidMount() {
        fetch('https://api.mydomain.com/users/XXX')
            .then(response => response.json())
            .then(data => this.setState({ userId: data.userId, fullname: data.fullname, avatarUrl: data.avatarUrl }));
    }

    render() {
        const fullname = this.state.fullname;
        const url = this.state.avatarUrl;
        return (
            <div className="UserHead">
                <Avatar url={url} alt={fullname} />
                <UserInfo fullname={fullname} />
            </div>
        );
    }
}

class Avatar extends Component {
    render() {
        return (
            <img className="Avatar" src={this.props.url} alt={this.props.fullname} />
        );
    }
}

class UserInfo extends Component {
    render() {
        return (
            <div className="UserInfo">
                <span className="fullname">{this.props.fullname}</span>
            </div>
        );
    }
}

export default User;