import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CommentInput from './commentInput'
import Like from './like'
import Timelabel from '../users/timelabel'
import UserHeader from '../users/userHeader';




class Comment extends Component {
 
    state = { showReplies: false, replyText:'', addComment: false};

    postCommentsHandler

    
    render() {
    const { type, postID } = this.props;

    const {
      replies,
      content,
      firstName,
      lastName,
      userId,
      key,
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
            <Link to={`/user/${userId}`}>{`${firstName} ${lastName}`}</Link> {content}
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
          {replies && this.state.showReplies
            ? replies
                .map((reply, i) => this.props.renderReplies(reply, i))
            : replies.length > 0 && (
                <a href='1' onClick={() => this.setState({ showReplies: true })}>
                  {replies[0].firstName}{' '}
                  {(replies[1] ? ' and ' + replies[1].firstName : '') +
                    ' replied to this comment'}{' '}
                  . {replies.length}{' '}
                  {replies.length === 1 ? 'Reply' : 'Replies'}
                </a>
              )}
          {type === 'comment' &&
            this.state.showReplies && (
              <CommentInput
                type={'reply'}
                value={this.state.replyText}
                onChange={event =>
                  this.setState({ replyText: event.target.value })}
              
               
              />
            )}
        </div>
      </div>
    );
  }
}



export default Comment;