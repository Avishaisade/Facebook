import React from 'react';
import { Link } from "react-router-dom";
import DefaultProfile from "../Images/default_profile.png";
import TimeLabel from "./timelabel";
import {getProfilePhoto} from "./apiUser"

const UserHeader = (props) => {

    const {_id, name} = props;
    const photoUrl = getProfilePhoto(_id)
    // console.log(props.post.created);

    return (
        <div className="UserHead">
            <img
                className="Avatar"
                height="30px"
                width="30px"
                onError={i =>
                    (i.target.src = `${DefaultProfile}`)
                }
                src={photoUrl}
                alt={name}
            />
            <Link 
                className="UserInfo" 
                to={`/users/${_id}`}>
                <span>{name}</span>
                <TimeLabel
                    post={props.created}
                />
            </Link>
        </div>
    )
}

export default UserHeader;