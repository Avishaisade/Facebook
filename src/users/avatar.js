import React, { Component } from 'react';

class Avatar extends Component {
    render() {
        return (
            <img className="Avatar" src={this.props.url} alt={this.props.fullname} />
        );
    }
}

export default Avatar;