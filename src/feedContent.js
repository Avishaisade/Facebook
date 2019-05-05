import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Comment from './comment/comment';
import CommentInput from './comment/commentInput';
import Timelabel from './users/timelabel'
import UserHeader from './users/userHeader';

class FeedContent extends Component {
  state = { showReplies: false, commentText: '' };


  //   postComment(){

  // }

  renderPostHeader() {
    //  <Timelabel/>
    // const ownPost = this.props.uID === Comment.props.content.userId;
    return (
      <div classNaName="postHeader-container">
        <div classNaName="user-header">
          <UserHeader
            userId={this.userId}
          />
        </div>
        <div classNaName="comment-container">
          <Link
            classNaName="user"
            to={`/user/${this.props.Comment.content.userId}`}
          >
            {`${this.props.content.firstName} ${this.props.content.lastName}`}
          </Link>
          <br />
          <span classNaName="time-stamp">
            <Timelabel />
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
  //  renderLikes(){
  //      return(
  //          <Like
  //             count={}
  //             />
  //      );

  //  }

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
              (f1, f2) => parseFloat(f2.Timelabel) - parseFloat(f1.Timelabel)
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
        {this.renderLikes()}
        {this.renderComments()}
      </div>
    );
  }
}


export default FeedContent;