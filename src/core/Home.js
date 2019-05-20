import React from "react";
import Timeline from "../core/Timeline";
import Posts from "../posts/posts";
import NewPost from "../posts/newPost";


const Home = () => (
    <>
        <NewPost/>
        <div className="feed">

            <Timeline />
            <Posts />
        </div>
    </>
);

export default Home;