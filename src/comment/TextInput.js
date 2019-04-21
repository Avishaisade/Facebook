// let replyContent= null;
    //   if(){
        
    //   }

    let moreRplies=null;
    if(this.state.showReplies === true ) {
      moreRplies=(
        replies.sort((f1, f2) =>
          parseFloat(f2.timestamp) - parseFloat(f1.timestamp)
          )
          .map((reply, i) =>{
            return <Comment
                      key={i}
                      type="reply"
                      content={{ ...reply, replies: [] }}
                  />}
          )
      );
    }
    
    return (
      <div className="comment-container">
        <div className="comment-userheader">
        <UserHeader 
             userId= {this.props.userId}  
          />
        </div> 

        <div className="?">
          <div className="comment-body">
            <Link to={`/users/${userId}`}>{`${firstName} ${lastName}`}</Link>
             {content}
          </div>
          
          <div className="comment-like">
            <Like/>
          </div>
            <button
              class="reply-btn"
              onClick={() =>this.setState({ addComment: true })}
            >
              Reply
            </button>
              <Timelabel/>
              {moreRplies}
            {
               replies.length > 0?
            <a href="1 " onClick={() => this.setState({ showReplies: true })}>
              {replies[0].firstName}{' '}
              {(replies[1] ? ' and ' + replies[1].firstName : '') +
              ' replied to this comment'}{' '}
              {replies.length}{' '}
              {replies.length === 1 ? 'Reply' : 'Replies'}
            </a>
            :null
            }
            {
            this.state.addComment?
                <CommentInput
                type={'reply'}
                value={this.state.replyText}
                onChange={event =>
                  this.setState({ replyText: event.target.value })
                }
            />: null
          }
        </div>
      </div>
      
    );
  }
}
