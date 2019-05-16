import React, { Component } from 'react';
import { UserHeader } from '../users/userHeader';
import { Comment } from '../comment/comment';
import Like from '../comment/like';

class Post extends Component {
    state = { isLoaded: false, post: {} };

    componentDidMount() {
        fetch('http://localhost:8080/posts/5cc753e748e3ba4324018e81')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    post: data,
                    isLoaded: true
                });
            });
    }

    render() {
        const { isLoaded, user, post } = this.state;
        if (!isLoaded) {
            return <div>Loading Post...</div>;
        }
        return (
            <div className="post">
                <UserHeader 
                    user={user}
                />
                <div className="postBody">
                    {post.body}
                </div>
                <Like/>
                <Comment/>
            </div>
        );
    }
}

export default Post;