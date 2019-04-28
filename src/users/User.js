import React, { Component } from 'react';
import Cover from './cover';

class User extends Component {
    state = { isLoaded: false, user: {} };

    componentDidMount() {
        fetch('http://localhost:8080/users/5cc5b97ed4b68d29ece7e7fd')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    user: data,
                    isLoaded: true
                });
            });
    }

    render() {
        const { isLoaded, user } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Cover user={user}></Cover>
            </div>
        );
    }
}

export default User;