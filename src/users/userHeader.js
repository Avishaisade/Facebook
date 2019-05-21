import React from 'react';
import { Link } from "react-router-dom";
import DefaultProfile from "../Images/default_profile.png";
import TimeLabel from "./timelabel";

const UserHeader = (props) => {

    const user = props.user;
    const { _id, name } = user
    const photoUrl = `${process.env.REACT_APP_API_URL}/users/${_id}/photo`;
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
            <Link className="UserInfo" to={`/user/${_id}`}>
                <span>{name}</span>
                <TimeLabel
                    post={props.post}
                />
            </Link>
        </div>
    )
}

export default UserHeader;