import React  from "react";
import { getProfilePhoto } from '../users/apiUser';
import DefaultProfile from "../Images/defult_profile.jpg";

const UserPicture = (id, name)=>{
    let Photo= getProfilePhoto(id);
        if(!Photo)
        {Photo= DefaultProfile}  
        return(
            <img
                src={Photo}
                alt={name}
            />
        );      
}

export default UserPicture;