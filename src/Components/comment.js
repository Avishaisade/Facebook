import React, { Component } from 'react';
import { Link } from "react-router-dom";
import InputBox from './inputbox'



class Comment extends Component {
  state = { showReplies: false, replyText: '' };
  render() {
    const { type, postID } = this.props;
    const {
      replies,
      content,
      authorName,
      authorID,
      key,
      timestamp   
    } = this.props.content;
    
    return (
      <div class="?">
        <div class="?">
          <img
            src={
              this.props.uID === authorID
                ? this.props.currentUser && this.props.currentUser.profilePic
                : "???" 
               
            }
            class="pic ?"
            alt=""
          />
        </div>

        <div class="?">
          <div class="??">
            <Link to={`/user/${authorID}`}>{authorName}</Link> {content}
          </div>

          <div class="?">
            <button class="reply-btn">Like</button>

            <button
              class="reply-btn"
              onClick={() => {
                this.setState({ showReplies: true });
              }}
            >
              Reply
            </button>
            {timestamp}
            {' ago'}
          </div>
          {replies && this.state.showReplies
            ? replies
                .sort(
                    (f1, f2) =>
                      parseFloat(f2.timestamp) - parseFloat(f1.timestamp)
                  )
                .map((reply, i) => this.props.renderReplies(reply, i))
            : replies.length > 0 && (
                <a href="1 " onClick={() => this.setState({ showReplies: true })}>
                  {replies[0].authorName}{' '}
                  {(replies[1] ? ' and ' + replies[1].authorName : '') +
                    ' replied to this comment'}{' '}
                {replies.length}{' '}
                  {replies.length === 1 ? 'Reply' : 'Replies'}
                </a>
              )}
          {type === 'comment' &&
            this.state.showReplies && (
              <InputBox
                type={'reply'}
                value={this.state.replyText}
                onChange={event =>
                  this.setState({ replyText: event.target.value })
                }
                sendPost={event => {
                  if (this.state.replyText.length > 0) {
                    this.props.postReply(
                      postID,
                      key,
                      authorID,
                      authorName,
                      this.state.replyText
                    );
                    this.setState({ replyText: '' });
                  }
                }}
              />
            )}
        </div>
      </div>
    );
  }
}

export default Comment;