// src/components/BlogForm/BlogForm.jsx
import React, { useState } from 'react';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [articles, setArticles] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() !== '') {
            setArticles((prevArticles) => [...prevArticles, { id: Date.now(), title }]);
            setTitle('');
        }
    };

    const handleDelete = (id) => {
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
        // Reset editing state if the deleted article is being edited
        if (editingId === id) {
            setEditingId(null);
            setEditTitle('');
        }
    };

    const handleEdit = (id, currentTitle) => {
        setEditingId(id);
        setEditTitle(currentTitle);
    };

    const handleSaveEdit = (id) => {
        setArticles((prevArticles) =>
            prevArticles.map((article) =>
                article.id === id ? { ...article, title: editTitle } : article
            )
        );
        setEditingId(null);
        setEditTitle('');
    };

    return (
        <div className='my-container d-flex flex-column align-items-center'>

            <div className="row width-full">
                <div className="col no-padding">
                    <form className='width-full no-padding mb-3' onSubmit={handleSubmit}>
                        <label className='form-label'>
                            New Post:
                        </label>
                        <div className='d-flex'>

                            <input type="text" className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} />
                            <button className='btn btn-primary' type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row width-full">
                <hr className='width-400' />
                <ul className='list-unstyled width-full no-padding-left'>
                    {articles.map((article) => (
                        <li key={article.id}>
                            {editingId === article.id ? (
                                <div className='d-flex'>
                                    <input type="text" className='form-control' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                    <button className='btn btn-primary px-3' onClick={() => handleSaveEdit(article.id)}>Save</button>
                                </div>
                            ) : (
                                <div className='row my-1'>
                                    <div className="col-9 no-padding">
                                        <span className='mx-3'>{article.title}</span>
                                    </div>
                                    <div className="col-3 no-padding">
                                        <div className='d-flex justify-content-end'>
                                            <button className='btn btn-sm btn-warning' onClick={() => handleEdit(article.id, article.title)}>
                                                <i className="fa-solid fa-edit"></i>
                                            </button>
                                            <button className='btn btn-sm btn-danger' onClick={() => handleDelete(article.id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <hr className='width-400' />
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default BlogForm;
