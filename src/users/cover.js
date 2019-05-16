import React, { Component } from 'react';
import DefaultProfile from "../Images/defult_profile.jpg";
import {updateUser } from "./apiUser";
class Cover extends Component {
    render() {
        const user = this.props.user;
        // console.log(user);
        return (
            <div className= "coverHeaderContainer">
                {/* <form>
                    <div className="form-group">
                    <label className="text-muted">Profile Photo</label>
                    <input
                        // onChange={this.handleChange("photo")}
                        type="file"
                        accept="image/*"
                        className="form-control"
                    />
                     </div>
                     <button
                    onClick={this.clickSubmit}
                    className="btn"
                >
                    Update
                </button>
                </form> */}
                <div className= "userCoverContainer">
                    <div className= "coverImage">
                        <img 
                            src={this.props.coverUrl} 
                            alt={user.name} 
                            onError={i => (i.target.src = `${"https://woodfordoil.com/wp-content/uploads/2018/02/placeholder.jpg"}`)}
                        />
                        <div className= "coverBorder"></div>
                    </div>
                </div>
                <div className= "fbTimelineHeadline">
                    <div className= "actionsCoverPic">

                    </div>
                    <div className= "headerMenu">
                        <ul className= "_6_7 clearfix">
                            <li><div className= "_6a _6-6 _9rx _6-7"><a className= "_9ry _p" href="#">Timeline</a></div></li>
                            <li><div className= "_6a _6-6 _9rx _6-7"><a className= "_9ry _p" href="#">About</a></div></li>
                            <li><div className= "_6a _6-6 _9rx _6-7"><a className= "_9ry _p" href="#">Friends <span class="_gs6">845</span></a></div></li>
                            <li><div className= "_6a _6-6 _9rx _6-7"><a className= "_9ry _p" href="#">Photos</a></div></li>
                            <li><div className= "_6a _6-6 _9rx _6-7"><a className= "_9ry _p" href="#">Archive</a></div></li>
                        </ul>
                        <img className="profilePicThumb" 
                            src={this.props.url} 
                            alt={user.name}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                     />
                    </div>
                    <div className= "userInfoCover">
                        <div className= "_2nlj _2xc6">
                            <h1 className= "_2nlv">
                                <span className= "_2t_q" >
                                    <a className= "_2nlw _2nlv" href="">{user.name} </a>
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