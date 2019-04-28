import React, { Component } from 'react';

class Cover extends Component {
    render() {
        const user = this.props.user;
        return (
            <div className="coverHeaderContainer">
                <div className="userCoverContainer">
                    <div className="coverImage">
                        <img src={user.coverPic} alt={user.firstName + ' ' + user.lastName} />
                        <div className="coverBorder"></div>
                    </div>
                </div>
                <div className="fbTimelineHeadline">
                    <div className="actionsCoverPic">

                    </div>
                    <div className="headerMenu">
                        <ul className="_6_7 clearfix">
                            <li><div class="_6a _6-6 _9rx _6-7"><a class="_9ry _p" href="#">Timeline</a></div></li>
                            <li><div class="_6a _6-6 _9rx _6-7"><a class="_9ry _p" href="#">About</a></div></li>
                            <li><div class="_6a _6-6 _9rx _6-7"><a class="_9ry _p" href="#">Friends <span class="_gs6">845</span></a></div></li>
                            <li><div class="_6a _6-6 _9rx _6-7"><a class="_9ry _p" href="#">Photos</a></div></li>
                            <li><div class="_6a _6-6 _9rx _6-7"><a class="_9ry _p" href="#">Archive</a></div></li>
                        </ul>
                        <img className="profilePicThumb" alt="Image" src={user.avatarPic} />
                    </div>
                    <div className="userInfoCover">
                        <div className="_2nlj _2xc6">
                            <h1 className="_2nlv">
                                <span className="_2t_q" >
                                    <a className="_2nlw _2nlv" href="https://www.facebook.com/OsherLevy">{user.firstName + ' ' + user.lastName} ‎<span class="alternate_name">({user.alernateName})</span>‎</a>
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cover;