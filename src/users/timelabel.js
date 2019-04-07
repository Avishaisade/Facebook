import React, { Component } from 'react';
import moment from 'moment';

class TimeLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeAgo: moment(this.props.dateAdded).startOf('minute').fromNow()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            timeAgo: moment(this.props.dateAdded).startOf('minute').fromNow()
        });
    }

    render() {
        return (
            <span className="timeLabel">{this.state.timeAgo}</span>
        );
    }
}

export default TimeLabel;