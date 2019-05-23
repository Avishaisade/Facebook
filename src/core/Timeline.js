import React, { Component } from "react";
import { postByFriends } from "../Posts/apiPost";
import SinglePost from "../Posts/SinglePost";
import { isAuthenticated } from "../auth";

class Timeline extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            // following:[]
        };
    }
    
    // loadFollowing = () => {
    //     const userId = isAuthenticated().user._id;
    //     const token = isAuthenticated().token;  
    //     followingbyUser(userId).then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    //             this.setState({ posts: data });
    //             console.log(data);
                
    //         }
    //     });
    // };
    loadPosts = () => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;  
        postByFriends(userId,token ).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
                console.log(data);
                
            }
        });
    };
    

    componentDidMount() {
        this.loadPosts(this.state.posts);
    }
   

    renderPosts = posts => {
        return (
            <div className="col">
                <hr />
                {posts.map((post, i) => (
                    <div key={i}>
                        <SinglePost
                            postId={[post._id]}
                        />
                    </div>
                ))}
            </div>

        );
    };

    render() {
        const { posts } = this.state;
        // console.log(isAuthenticated().user);
        return (
            <div className="container">

                {this.renderPosts(posts)}


            </div>
        );
    }
}

export default Timeline;







