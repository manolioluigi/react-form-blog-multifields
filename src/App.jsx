// src/App.jsx
import React from 'react';
import BlogForm from './components/BlogForm';

const App = () => {
  return (
    <div className='container d-flex flex-column align-items-center my-5'>
      <h1 className='mb-5'>reactFormBlog.jsx</h1>
      <BlogForm />
    </div>
  );
};

export default App;
