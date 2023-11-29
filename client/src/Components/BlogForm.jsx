import React, { useState } from 'react';
import axios from 'axios';

function BlogForm() {
  const [formData, setFormData] = useState({
    blog_autor: '',
    blog_img: '',
    blog_title: '',
    blog_subdescription: '',
    blog_description: '',
  });

  const [isSuccess, setIsSuccess] = useState(false); // State for success notification

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/blog', formData);
      console.log('Blog created:', response.data);
      setIsSuccess(true); // Set success status to true
      // Optionally, you can redirect to the newly created blog or update the blogs list.
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    
      <div className="BlogForm bg-white p-8 rounded-lg ">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Create a New Blog</h2>

        {isSuccess && ( 
          <div className="mb-4 p-2 bg-green-200 text-green-800 rounded-md">
            Blog created successfully!
          </div>
        )}

        <form className="flex flex-wrap " onSubmit={handleSubmit}>
          <div className="mb-4 w-full ">
            
            <label htmlFor="blog_title" className="block text-sm font-medium text-gray-600">
              Blog Title:
            </label>
            <input
              type="text"
              id="input-blog"
              name="blog_title"
              value={formData.blog_title}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="blog_img" className="block text-sm font-medium text-gray-600">
              Image URL:
            </label>
            <input
              type="text"
              id="input-blog"
              name="blog_img"
              value={formData.blog_img}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="blog_autor" className="block text-sm font-medium text-gray-600">
              Blog Author:
            </label>
            <input
              type="text"
              id="input-blog"
              name="blog_autor"
              value={formData.blog_autor}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* <div className="mb-4 w-full">
            <label htmlFor="blog_subdescription" className="block text-sm font-medium text-gray-600">
              Blog Subdescription:
            </label>
            <textarea
              id="input-blog"
              name="blog_subdescription"
              value={formData.blog_subdescription}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div> */}
          <div className="mb-4 w-full">
            <label htmlFor="blog_description" className="block text-sm font-medium text-gray-600">
              Blog Description:
            </label>
            <textarea
              id="input-blog"
              name="blog_description"
              value={formData.blog_description}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 focus:outline-none flex"
          >
            Create Blog
          </button>
        </form>
      </div>

  );
}

export default BlogForm;
