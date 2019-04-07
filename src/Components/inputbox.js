import React, { Component } from 'react';
import Avatar from './';
import UserInfo from './';

class InputBox extends Component {

    render() {
        const { type } = this.props;
        return (
            <div class="?">
                <div class="?">
                    <Avatar/>
                    <UserInfo/> 
                </div>

                <input
                    {...this.props}
                    onChange={this.props.onChange}
                    class="?"
                    placeholder={
                        type === 'reply'
                            ? 'Type your reply here...'
                            : 'Type your comment here...'
                    }
                    value={this.props.value}
                    onKeyDown={event => {
                        if (event.keyCode === 13) this.props.sendPost();
                    }}
                />

            </div>
        );
    }
}

export default InputBox;