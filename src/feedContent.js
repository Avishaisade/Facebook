import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Comment from './comment/comment';
import CommentInput from './comment/commentInput';
import Timelabel from './users/timelabel'
import UserHeader from './users/userHeader';
import Like from './comment/like'

class FeedContent extends Component {
  state = { showReplies: false };
   renderPostHeader() {
    //  <Timelabel/>
      
    // const ownPost = this.props.uID === Comment.props.content.userId;
    return (
      <div classNaName="feed-container">
        <div classNaName="user-header">
        <UserHeader 
             userId= {this.userId}  
          />
        </div>
        <div classNaName="">
          <Link
            classNaName="user"
            to={`/user/${Comment.props.content.userId}`}
          >
            {`${this.props.content.firstName} ${this.props.content.lastName}`}
          </Link>
          <br />
          <span classNaName="time-stamp">
            <Timelabel/>
          </span>
        </div>
      </div>
    );
  }
   renderPostContent() {
    return (
      <div classNaName="content">
        <div>{this.props.content.content}</div>
      </div>
    );
  }
   renderLikeCommentButton() {
    return (
      <Like/>
    );
  }
   postComment() {
    if (this.state.commentText.length > 0) {
      this.props.postComment(
        this.props.content.key,
        this.props.content.userId,
        this.props.content.lastName,
        this.props.content.firstName,
        this.state.commentText,
      );
      this.setState({ commentText: '' });
    }
  }
  renderComments() {
    const values = this.props.content.comments
      ? Object.values(this.props.content.comments).slice()
      : [];
    const keys = this.props.content.comments
      ? Object.keys(this.props.content.comments).slice()
      : [];
    values.map((value, i) => (value['key'] = keys[i]));
    return (
      <div classNa="comments">
        <CommentInput
          value={this.state.commentText}
          type="comment"
          onChange={event => this.setState({ commentText: event.target.value })}
          sendPost={() => this.postComment()}
        />
        <div classNa="comments-container">
          {values
            .sort(
              (f1, f2) => parseFloat(f2.timestamp) - parseFloat(f1.timestamp)
            )
            .map((comment, i) => (
              <Comment
                key={i}
                type="comment"
                content={{
                  ...comment,
                  replies: comment.replies ? Object.values(comment.replies) : []
                }}
                postID={this.props.content.key}
                renderReplies={(reply, i) => (
                  <Comment
                    key={i}
                    type="reply"
                    content={{ ...reply, replies: [] }}
                  />
                )}
              />
            ))}
        </div>
      </div>
    );
  }
  render() {
    return (
      <div classNa="feedBox">
        {this.renderPostHeader()}
        {this.renderPostContent()}
        {this.renderLikeCommentButton()}
        {this.renderComments()}
      </div>
    );
  }
}


export default FeedContent;