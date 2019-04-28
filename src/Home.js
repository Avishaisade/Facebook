import React from 'react';
import UserHeader from './users/userHeader';

function Home() {
    const user = {
        userId: null,
        firstName: "Osher",
        lastName: "Levy",
        avatarUrl: "https://i.pinimg.com/originals/45/d9/8a/45d98aa922bef6b5213b488dc36a8764.png"
    };
    return (
        <div>
            <h1>Home.</h1>
            <UserHeader user={user} />
        </div>
    );
}

export default Home;