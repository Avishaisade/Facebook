import React from 'react';
import UserHeader from './users/userHeader';
import Comment from './comment/comment';
import FeedContent from './feedContent';

function Home() {
    return (
        <div>
            <h1>Home</h1>
           {/* <UserHeader id="XXX" />  */}
            <Comment 
                type= 'comment'
                 content={ 
                  { replies:[],
                    content: "hello world",
                    firstName: "avishai",
                    lastName:"sade",
                    userId: 1,
                    key:1
                 }}       
            />
            {/* <CommentInput/> */}
            {/* <FeedContent/> */}
        </div> 
    );
}

export default Home;