import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BlogPost } from 'blog-common';
import { CommentCreate } from './comment-create';
import { CommentList } from './comment-list';

export function PostList() {

    const [posts, setPosts] = useState<BlogPost[]>([]);

    const fetchPosts = async () => {
        const request = await axios.get("http://posts.com/posts");
        console.log(request.data);
        setPosts(request.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = posts.map(blogPost => {
        return (
            <div
                className="card"
                style={{ width: "30%", marginBottom: "20px" }}
                key={blogPost.id}
            >
                <div className="card-body">
                    <h4>{blogPost.title}</h4>
                    <CommentList comments={blogPost.comments} />
                    <br />
                    <CommentCreate {...blogPost} />
                </div>

            </div>
        )
    });

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>;
}