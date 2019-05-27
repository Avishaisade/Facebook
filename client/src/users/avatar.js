import React from 'react';
import DefaultProfile from "../Images/default_profile.png";
import { getProfilePhoto } from "../users/apiUser";

const Avatar = (props) => {

    const { _id, name } = props;
    let photoUrl = getProfilePhoto(_id);
    return (
        <div className="userAvatarContainer">
            <img
                className="Avatar"
                src={photoUrl}
                alt={name}
                onError={i =>
                    (i.target.src = `${DefaultProfile}`)
                }
            />
            {name !== "" ? name : ""}
        </div>
    );
}


export default Avatar;




