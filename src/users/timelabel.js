import React, { Component } from 'react';
import moment from 'moment';

class TimeLabel extends Component {
    render() {
        const date = this.props.dateAdded;
        return (
            <span className="timeLabel">{moment(date).startOf('hour').fromNow()}</span>
        );
    }
}

export default TimeLabel;