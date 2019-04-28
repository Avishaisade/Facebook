import React, { Component } from 'react'; 
import UserHeader from '../users/userHeader';

class CommentInput extends Component {
  render() {
    const { type } = this.props;
    return (
      <div className="input-container">
        <div className="input-user">         
        <UserHeader/>
        </div>

        <input
          {...this.props}
          onChange={this.props.onChange}
          className="form-control"
          placeholder={
            type === 'reply'
              ? 'Type your reply here...'
              : 'Type your comment here...'
          }
          value={this.props.value}
          onKeyDown={event => {
            if (event.keyCode === 13) this.props.sendCommnt();
          }}
        />
        <button
              class="reply-btn"
              onClick={() => {
                this.props.sendCommnt();
              }}
            >
              Reply
            </button>
        
      </div>
    );
  }
};

export default  CommentInput  ;