import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CommentInput from './commentInput'
import Like from './like'
import Timelabel from '../users/timelabel'
import UserHeader from '../users/userHeader';




class Comment extends Component {
 
    state = { showReplies: false, replyText:'', addComment: false};
   
    render() {
    const { type, postID } = this.props;
    const {
      replies,
      content,
      firstName,
      lastName,
      userId,
      key,
      
    } = this.props.content;
    return (
      <div class="row minor-padding">
        <div class="col-lg-1 col-md-1 col-sm-1">
        <UserHeader 
             userId= {this.props.userId}  
          />
        </div>
        <div class="col-lg-11 col-md-11 col-sm-11">
          <div class="w3-card comment-card  minor-padding">
            <Link to={`/user/${userId}`}>{`${firstName} ${lastName}`}</Link> {content}
          </div>
          <div class="row">
            <button class="reply-btn">Like</button>
            .
            <button
              class="reply-btn"
              onClick={() => {
                this.setState({ showReplies: true });
              }}
            >
              Reply
            </button>
            <Timelabel/>
           
          </div>
          {replies && this.state.showReplies
            ? replies
                .sort(
                  (f1, f2) =>
                    parseFloat(f2.timestamp) - parseFloat(f1.timestamp)
                )
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
                  this.setState({ replyText: event.target.value })
                }
                // sendPost={event => {
                //   if (this.state.replyText.length > 0) {
                //     this.props.postReply(
                //       postID,
                //       key,
                //       userId,
                //       lastName,
                //       firstName,
                //       this.state.replyText
                //     );
                //     this.setState({ replyText: '' });
                //   }
                // }}
              />
            )}
        </div>
      </div>
    );
  }
}



export default Comment;