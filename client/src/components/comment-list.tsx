import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BlogPost, PostComment } from 'blog-common';

export function CommentList(blogPost: BlogPost) {

    const [comments, setComments] = useState<PostComment[]>([]);
    const fetchComments = async () => {
        const request = await axios.get(`http://localhost:4001/posts/${blogPost.id}/comments`);
        setComments(request.data);
    }

    useEffect(() => {
        fetchComments();
    }, []);

    const renderedComments = comments.map(postComment => {
        return <li key={postComment.id}>{postComment.text}</li>;
    });

    return <ul > {renderedComments} </ul>;
}