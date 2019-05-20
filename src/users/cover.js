import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { updateUser } from "./apiUser";
import {getProfilePhoto ,getCoverPhoto} from "./apiUser";
import DefaultProfile from "../Images/default_profile.png";

class Cover extends Component {

    render() {
        const user = this.props.user;
        const photoUrl = getProfilePhoto(user._id); 
        const coverPhotoUrl = getCoverPhoto(user._id); 
        let coverPhoto= coverPhotoUrl;
            if(!coverPhoto)
            {coverPhoto= DefaultProfile}
        return (
            <div className="coverHeaderContainer">
                <div className="userCoverContainer">
                    <div className="coverImage">
                        <img
                            src={coverPhoto}
                            alt={user.name}
                            onError={i => (i.target.src = `${"https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/08/facebook-cover-photo-header.jpg"}`)}
                        />
                        <div className="coverBorder"></div>
                    </div>
                </div>
                <div className="fbTimelineHeadline">
                    <div className="actionsCoverPic">

                    </div>
                    <div className="headerMenu">
                        <ul className="_6_7 clearfix">
                            <li>
                                <div className="_6a _6-6 _9rx _6-7">
                                    <a className="_9ry _p" href="#">Timeline</a>
                                </div>
                            </li>
                            <li>
                                <div className="_6a _6-6 _9rx _6-7">
                                    <a className="_9ry _p" href="#">About</a>
                                </div>
                            </li>
                            <li>
                                <div className="_6a _6-6 _9rx _6-7">
                                    <a className="_9ry _p" href="#">Friends 
                                        <span className="_gs6">{this.props.followers}</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="_6a _6-6 _9rx _6-7">
                                    <a className="_9ry _p" href="#">Photos</a>
                                </div>
                            </li>
                            <li><div className="_6a _6-6 _9rx _6-7">
                                <a className="_9ry _p" href="#">Archive</a>
                                </div>
                            </li>
                        </ul>
                        <img className="profilePicThumb"
                            src={photoUrl }
                            alt={user.name}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                        />
                    </div>
                    <div className="userInfoCover">
                        <div className="_2nlj _2xc6">
                            <h1 className="_2nlv">
                                <span className="_2t_q" >
                                    <a className="_2nlw _2nlv" href="">{user.name} </a>
                                </span>
                            </h1>
                        </div>
                        <div className="_actionBar">
                            <Link to={`/user/edit/${user._id}`}><i className="userIcon_2 edit"></i> Edit Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cover;