import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BlogPost, PostComment } from 'blog-common';

export function CommentList(props: { comments: PostComment[] }) {
    const { comments } = props;
    const renderedComments = comments.map(postComment => {
        return <li key={postComment.id}>{postComment.text}</li>;
    });

    return <ul > {renderedComments} </ul>;
}