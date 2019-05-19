import React from 'react';
import moment from 'moment';

const TimeLabel= (props)=> {  
    const postCreated = props.post.created
         return (
            postCreated?
            <span className="timeLabel">{moment(postCreated).startOf('minute').fromNow()}</span>
            : null
        );
    }


export default TimeLabel;