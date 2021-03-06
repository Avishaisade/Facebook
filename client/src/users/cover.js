import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProfilePhoto, getCoverPhoto } from "./apiUser";
import FollowProfileButton from "./FriendProfileButton";
import DefaultProfile from "../Images/default_profile.png";
import { isAuthenticated } from "../auth";

class Cover extends Component {

    render() {
        const user = this.props.user;
        const photoUrl = getProfilePhoto(user._id);
        const coverPhoto = getCoverPhoto(user._id);
        const friends = user.friends;

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
                                    <Link className="_9ry _p" to={""}>
                                        Timeline
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="_6a _6-6 _9rx _6-7">
                                    <Link className="_9ry _p" to={""}>
                                        About
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="_6a _6-6 _9rx _6-7">
                                    <Link className="_9ry _p" to={""}>
                                        Friends
                                            <span className="_gs6">
                                            {friends.length}
                                        </span>
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="_6a _6-6 _9rx _6-7">
                                    <Link className="_9ry _p" to={""}>
                                        Photos
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="_6a _6-6 _9rx _6-7">
                                    <Link className="_9ry _p" to={""}>
                                        Archive
                                    </Link
                                    ></div>
                            </li>
                        </ul>
                        <img className="profilePicThumb"
                            src={photoUrl}
                            alt={user.name}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                        />
                    </div>
                    <div className="userInfoCover">
                        <div className="_2nlj _2xc6">
                            <h1 className="_2nlv">
                                <span className="_2t_q" >
                                    <Link className="_2nlw _2nlv" to={""}>{user.name} </Link>
                                </span>
                            </h1>
                        </div>
                        <div className="_actionBar">
                            {isAuthenticated().user &&
                                isAuthenticated().user._id === user._id ? (
                                    <div className="1">
                                    </div>
                                ) : (
                                    <FollowProfileButton
                                        friends={user.friends}
                                        onButtonClick={this.clickFriendButton}
                                    />
                                )}
                            <Link to={`/user/edit/${user._id}`}><i className="userIcon_2 edit"></i> Edit Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cover;