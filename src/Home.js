import React, { Component } from 'react';
import Comment from './comment/comment';
import UserHeader from './users/userHeader';
import { fetchUsers, fetchSpecificUser, createUser, deleteUser } from './Services/UserService';

class Home extends Component {
    state = { isLoaded: false, user: {} };

    componentDidMount() {
        fetchSpecificUser('5ccdbe0c3e2e093b343c28bd')
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
                <h1>Home.</h1>
                <UserHeader user={user} />
                {/* <Comment
                    replies={[]}
                    content={'hello world'}
                    firstName={'avishai'}
                    lastName={'sade'}
                    userId={1}
                /> */}
            </div>

        );
    }
}

export default Home;