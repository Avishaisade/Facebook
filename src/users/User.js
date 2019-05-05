import React, { Component } from 'react';
import Cover from './cover';

// import { UsersService } from "./UsersService";

// const usersService = new UsersService();

class User extends Component {
    state = { isLoaded: false, user: {} };

    componentDidMount() {
        fetch('http://localhost:8080/users/5cc753e748e3ba4324018e81)')
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