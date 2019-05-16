import React from 'react';
import { Link } from "react-router-dom";
import DefaultProfile from "../Images/defult_profile.jpg";


const UserHeader = (props) =>{
    
    const user = props;
    const {_id, name} = user
    const photoUrl= `${process.env.REACT_APP_API_URL}/user/photo/${_id}`;   
    return(
        <div>
            <img
                style={{
                    borderRadius: "50%",
                    border: "1px solid black"
                }}
                className=""
                height="30px"
                width="30px"
                onError={i =>
                    (i.target.src = `${DefaultProfile}`)
                }
                src={photoUrl}
                alt={name}
            />
            <Link to={`/user/${_id}`}> {name}</Link>
          
</div>
)
}

export default UserHeader;