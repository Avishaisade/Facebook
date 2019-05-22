import React from "react";
import Timeline from "../core/Timeline";
import NewPost from "../Posts/newPost";


const Home = () => (
    <>
        <NewPost />
        <div className="feed">
            <Timeline />
        </div>
    </>
);

export default Home;