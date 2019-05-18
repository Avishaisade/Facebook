import React, { Component } from "react";
import { list } from "../posts/apiPost";
import SinglePost from "../posts/SinglePost";

class Timeline extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
        };
    }

    loadPosts =() => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
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
        const { posts} = this.state;
        return (
            <div className="container">
                
                {this.renderPosts(posts)}

                
            </div>
        );
    }
}
    
export default Timeline;







