import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../Images/defult_profile.jpg";
import {getProfilePhoto} from "../users/apiUser";

class ProfileTabs extends Component {
    render() {
        const { following, followers } = this.props;

        const friends= following.concat(followers)


        return (
            <div>
                <div className="row">
                    <div className="col">
                        <h3 className="text">
                            {friends.length} Friends
                        </h3>
                        <hr />
                        {friends.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/users/${person._id}`}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfile}`)
                                            }
                                            src={getProfilePhoto(person._id)}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p className="lead">
                                                {person.name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>  
                </div>
            </div>
        );
    }
}

export default ProfileTabs;