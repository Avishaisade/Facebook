import React, { Component } from 'react';

class Cover extends Component {
    render() {
        return (
            <div className="coverHeaderContainer">
                <div className="userCoverContainer">
                    <div className="coverImage">
                        <img src={this.props.url} alt={this.props.fullname} />
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
                        <img className="profilePicThumb" alt="Image" src="https://scontent.fhfa2-2.fna.fbcdn.net/v/t1.0-1/p320x320/41856506_10156700667269031_257695933226024960_n.jpg?_nc_cat=106&_nc_ht=scontent.fhfa2-2.fna&oh=3bd1b5afbbbac53409428069fe71b09e&oe=5D36CA5C" />
                    </div>
                    <div className="userInfoCover">
                        <div className="_2nlj _2xc6">
                            <h1 className="_2nlv">
                                <span className="_2t_q" >
                                    <a className="_2nlw _2nlv" href="https://www.facebook.com/OsherLevy">Osher Levy ‎<span class="alternate_name">(אושר לוי)</span>‎</a>
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