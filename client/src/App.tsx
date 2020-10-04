import React , {useState } from 'react';
import './App.css';
import PostCreate from './components/post-create';
import  { PostList } from './components/post-list';

function App() {
  return (
    <div className="container">
      <div>Blog</div>
      <div className="clear"></div>
      <h4>Create Post</h4>
      <PostCreate />
      <br/ >
      <PostList />
    </div>
  );
}
export default App;
