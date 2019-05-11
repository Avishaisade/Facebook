import React, { Component } from 'react';
import DefaultProfile from "../Images/defult_profile.jpg";

class Avatar extends Component {
    render() {
        if (this.props.online) {
            return (
                <div className="userAvatarContainer">
                    <img className="Avatar" 
                    src={this.props.url} 
                    alt={this.props.name}
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                     />
                    <div className="onlineTag"></div>
                </div>
            );
        } else {
            return (
                <div className="userAvatarContainer">
                    <img
                     className="Avatar" 
                     src={this.props.url} 
                     alt={this.props.fullname}
                     onError={i => (i.target.src = `${DefaultProfile}`)} 
                     style= {{height: "200px", width: "auto" }}
                     />
                </div>
            );
        }
    }
}

export default Avatar;