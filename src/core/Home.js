import React from "react";
import Timeline from "../core/Timeline";
import Posts from "../Posts/posts";
import NewPost from "../Posts/newPost";


const Home = () => (
    <>
        <NewPost />
        <div className="feed">

            <Timeline />
            <Posts />
        </div>
    </>
);

export default Home;