import React from "react";
import { Link } from 'react-router-dom';
import UserPicture from "./UserPicture";

export default function userFriendsTab(props) {
    const { following, followers } = props;
    const friends = following.concat(followers);

    return (
        <div className="userDetails clearfix-t">
            <img class="img" src="https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/gfh6ZI4vOdW.png" alt="" width="20" height="20" />
            <span className="title ver_top">
                &nbsp; Friends  ·  <span className="muted ver_top">{friends.length}</span>
            </span>
            <Link className="linker float-right t_sm" to={""}>
                Find Friends
            </Link>
            <div className="body friends">
                <ul>
                    {friends.map((person, i) => (
                        <li>
                            <div style={{ position: 'relative' }}>
                                <Link to={`/user/${person._id}`}>
                                    {UserPicture(person._id, person.name)}
                                    <div className="_fr_name">{person.name}</div>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
}