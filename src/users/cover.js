import React, { Component } from 'react';

class Cover extends Component {
    render() {
        return (
            <div className="userCoverContainer">
                <div className="coverImage">
                    <img src={this.props.url} alt={this.props.fullname} />
                    <div className="coverBorder"></div>
                </div>
            </div>
        );
    }
}

export default Cover;