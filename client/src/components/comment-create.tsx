import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BlogPost } from 'blog-common';
export function CommentCreate(blogPost: BlogPost) {
    const [commentText, setCommentText] = useState('');
    const onSubmit = async (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        await axios.post(`http://posts.com/posts/${blogPost.id}/comments`, {
            text: commentText
        });

        setCommentText('');
    }

    return <div >
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Comment</label>
                <input value={commentText} onChange={evt => {
                    setCommentText(evt.target.value);
                }} className="form-control"></input>
            </div>
            <button className="btn btn-primary">  Comment</button>
        </form>
    </div>;
}