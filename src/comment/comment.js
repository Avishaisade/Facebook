import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CommentInput from './commentInput'
import Like from './like'
import Timelabel from '../users/timelabel'
import UserHeader from '../users/userHeader';
import CommentsList from './commentsList';

class Comment extends Component {
  constructor(props) {
  super(props);
 
  this.state = { showReplies: false, replyText:'', addComment: false};

  }
    
render() {
  const { type, postID } = this.props;

  const {
    replies,
    content,
    firstName,
    lastName,
    userId,
    // timestamp= Timelabel.state.timeAgo,
  } = this.props.content;
    
    
  return (
    <div class="comment-container">
    <div class="comment- user">
      <UserHeader 
        userId= {this.props.content.userId}  
        firstName={this.props.content.firstName}
        lastName={this.props.content.lastName}
      />
    </div>
        <div class="comment-content">
        <div class="comment-link">
          <Link to={`/users/${userId}`}>{`${firstName} ${lastName}`}</Link> {content}
        </div>
        <div class="row">
          <button
            class="reply-btn"
            onClick={() => {
              this.setState({ showReplies: true });
            }}
          >
          Reply
          </button>
        <Like/>
        <Timelabel/>
          
      </div>
      <CommentsList
        showReplies= {this.state.showReplies}
        replies= {this.props.content}
      />
          {type === 'comment' &&
            this.state.showReplies && (
              <CommentInput
                type={'reply'}
                value={this.state.replyText}
                sendCommnt={replyText =>
                  this.setState({ replyText })}
              />
            )}
        </div>
      </div>
    );
  }
}



export default Comment;