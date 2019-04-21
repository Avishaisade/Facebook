import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Comment from './comment/comment';
import CommentInput from './comment/commentInput';
import Timelabel from '../users/timelabel'
import UserHeader from '../users/userHeader';
import Like from './comment/like'

class Feed extends Component {
  state = { showReplies: false };
   renderPostHeader() {
     <Timelabel/>
      
    const ownPost = this.props.uID === this.props.content.userId;
    return (
      <div class="row">
        <div class="col-lg-1 col-md-1 col-sm-1">
        <UserHeader 
             userId= {this.props.userId}  
          />
        </div>
        <div class="col-lg-10 col-md-10 col-sm-10">
          <Link
            class="text-vertical-align"
            to={`/user/${this.props.content.userId}`}
          >
            {`${this.props.content.firstName} ${this.props.content.lastName}`}
          </Link>
          <br />
          <span class="text-vertical-align time-stamp">
            <Timelabel/>
          </span>
        </div>
      </div>
    );
  }
   renderPostContent() {
    return (
      <div class="row minor-padding">
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
      <div class="row comments">
        <CommentInput
          value={this.state.commentText}
          type="comment"
          onChange={event => this.setState({ commentText: event.target.value })}
          sendPost={() => this.postComment()}
        />
        <div class="w3-container">
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
//   render() {
//     return (
//       <div class="w3-card major-padding remove-bottom-padding feed-margin">
//         {this._renderPostHeader()}
//         {this._renderPostContent()}
//         {this._renderLikeCommentButton()}
//         {this._renderComments()}
//       </div>
//     );
  }


export default Feed;