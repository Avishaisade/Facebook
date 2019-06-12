import React, { Component } from "react";
import { postByFriends } from "../Posts/apiPost";
import SinglePost from "../Posts/SinglePost";
import { isAuthenticated } from "../auth";

 loadPosts = () => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;  
        postByFriends(userId,token ).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                // console.log(data);
                this.setState({ posts: data });   
                console.log(this.state.posts)           
            }
        });
    };

   
    renderPosts = posts => {
        return (
            <div className="col">
                {posts.map((post, i) => (
                    <div key={i}>
                        <SinglePost
                            post={post}                          
                        />
                        {/* {console.log(post)} */}
                    </div>
                ))}
            </div>

        );
    };

//     render() {
//         const { posts } = this.state;
//         // console.log(isAuthenticated().user);
//         return (
//             <div className="container">

//                 {this.renderPosts(posts)}


//             </div>
//         );
//     }
// }









