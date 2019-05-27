import React from "react";
import { getProfilePhoto } from '../users/apiUser';
import DefaultProfile from "../Images/default_profile.png";

const UserPicture = ({ id, name }) => {
    let Photo = getProfilePhoto(id);
    return (
        <img
            src={Photo}
            alt={name}
            onError={i =>
                (i.target.src = `${DefaultProfile}`)
            }
        />
    );
}

export default UserPicture;