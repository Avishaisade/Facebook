import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProfilePhoto, getCoverPhoto } from "./apiUser";
import DefaultProfile from "../Images/default_profile.png";

class Cover extends Component {

    render() {
        const user = this.props.user;
        const photoUrl = getProfilePhoto(user._id);
        const coverPhotoUrl = getCoverPhoto(user._id);

        let coverPhoto = coverPhotoUrl;
        if (!coverPhoto) { coverPhoto = DefaultProfile }
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
                            <li><div className="_6a _6-6 _9rx _6-7"><Link className="_9ry _p" href={""}>Timeline</Link></div></li>
                            <li><div className="_6a _6-6 _9rx _6-7"><Link className="_9ry _p" href={""}>About</Link></div></li>
                            <li><div className="_6a _6-6 _9rx _6-7"><Link className="_9ry _p" href={""}>Friends <span class="_gs6">{this.props.followers}</span></Link></div></li>
                            <li><div className="_6a _6-6 _9rx _6-7"><Link className="_9ry _p" href={""}>Photos</Link></div></li>
                            <li><div className="_6a _6-6 _9rx _6-7"><Link className="_9ry _p" to={""}>Archive</Link></div></li>
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
                        <div class="_actionBar">
                            <Link to={`/user/edit/${user._id}`}><i className="userIcon_2 fb"></i> Add Friend</Link>
                            <Link to={`/user/edit/${user._id}`}><i className="userIcon_2 edit"></i> Edit Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cover;