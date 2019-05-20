import React  from 'react';
import DefaultProfile from "../Images/defult_profile.jpg";
import {getProfilePhoto} from "../users/apiUser";


const Avatar= (props)=> {

    const {_id, name}= props;
    let photoUrl= getProfilePhoto(_id);
    if(!photoUrl)
    {photoUrl= DefaultProfile}
    console.log(_id);
        return (
            <div className="userAvatarContainer">
                <img
                    className="Avatar" 
                    src={photoUrl} 
                    alt={name}
                    />
            </div>
        );
}
    

export default Avatar;



  
                