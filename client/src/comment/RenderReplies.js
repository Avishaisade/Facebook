import React, { Fragment } from 'react'; 
import Comment  from './comment'; 

export function Reply(reply){
    return (
        <Fragment>
        <div className="comments">
            {reply.content.comments.map((comment, i) => (
                <Comment
                key={i}
                type="comment"
                content={{
                    ...comment,
                    reply: comment.reply ? Object.values(comment.reply) : []
                }}
                postID={reply.content.key}
                renderReplies={(reply, i) => (
                    <Comment
                    key={i}
                    type="reply"
                    content={{ ...reply, reply: [] }}
                    />
                )}
                />
            ))}
        </div>
        </Fragment>
    );
 }

 export default Reply;

