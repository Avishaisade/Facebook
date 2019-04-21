import React, { Component } from 'react'; 
import UserHeader from '../users/userHeader';

class CommentInput extends Component {
  ref;
  render() {
    const { type } = this.props;
    return (
      <div className="major-padding input-group">
        <div className="input-group-addon">
         
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
            if (event.keyCode === 13) this.props.sendPost();
          }}
        />
        <span className="input-group-addon">
          <i class="glyphicon glyphicon-camera" />
        </span>
      </div>
    );
  }
};

export default  CommentInput  ;