import React from 'react';
import { PostComment } from 'blog-common';
import { CommentState } from 'blog-common/lib/models/post-comment';

export function CommentList(props: { comments: PostComment[] }) {
    const { comments } = props;
    const renderedComments = comments.map(postComment => {
        let displayText = postComment.text;

        if(postComment.state === CommentState.Pending){
            displayText = "Pending moderation";
        }

        if(postComment.state === CommentState.Rejected){
            displayText = "Comment is rejected by moderator";
        }
        
        return <li key={postComment.id}> {displayText} </li>;
    });

    return <ul > {renderedComments} </ul>;
}