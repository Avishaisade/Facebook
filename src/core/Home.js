import React from "react";
import Posts from "../posts/posts";
import NewPost from "../posts/newPost";


const Home = () => (
    <>
        <NewPost/>
        <div className="feed">
            <Posts />
        </div>
    </>
);

export default Home;