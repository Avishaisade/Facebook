import React, { Component } from 'react';
import DefaultProfile from "../Images/default_profile.png";

const Avatar = (_id, name) => {
    // const {_id, name} = props
    const photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${_id}`;
    return (
        <div className="userAvatarContainer">
            <img
                className="Avatar"
                src={photoUrl}
                alt={name}
                onError={i => (i.target.src = `${DefaultProfile}`)}
            //  style= {{height: "200px", width: "auto" }}
            />
        </div>
    );
}


export default Avatar;




