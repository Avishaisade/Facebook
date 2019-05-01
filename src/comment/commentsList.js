import React from 'react';
import Reply from './RenderReplies'

export function CommentsList(replies, showReplies) {
    if(!replies || !replies.length)
        return;

    if(showReplies)
        return replies.map((reply, i) => <Reply {...reply}/>)

    if(replies.length  > 0 )
        return(
            <a href='1' onClick={() => this.setState({ showReplies: true })}>
          {replies[0].firstName}{' '}
          {(replies[1] ? ' and ' + replies[1].firstName : '') +
            ' replied to this comment'}{' '}
          . {replies.length}{' '}
          {replies.length === 1 ? 'Reply' : 'Replies'}
        </a>       )   
}

export default CommentsList;



    
        




