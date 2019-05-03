import React, { Component } from 'react';
import UserHeader from './users/userHeader';
import Comment from './comment/comment';
import FeedContent from './feedContent';

class Home extends Component {
    state = { isLoaded: false, user: {} };state = { isLoaded: false, user: {} };

    // componentDidMount() {
    //     fetch('http://localhost:8080/users/5cc753e748e3ba4324018e81)')
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({
    //                 user: data,
    //                 isLoaded: true
    //             });
    //         });
    // }

    render() {
        const { isLoaded, user } = this.state;
        // if (!isLoaded) {
        //     return <div>Loading...</div>;
        // }
        return (
            <div>
                <h1>Home.</h1>
                {/* <UserHeader user={user} /> */}
                <Comment
                    replies= {[]}
                    content={'hello world'}
                    firstName={'avishai'}
                    lastName={'sade'}
                    userId= {1}
                />
            </div>
            
        );
    }
}

export default Home;