// UpdateBlog.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateBlog = ({ onClose, blogData }) => {
  const [formData, setFormData] = useState({
    blog_title: "",
    blog_img: "",
    blog_autor: "",
    blog_subdescription: "",
    blog_description: "",
    // ... Add the remaining fields specific to the blog here
  });

  useEffect(() => {
    // When blogData changes (when updating the form)
    if (blogData) {
      setFormData(blogData);
    }
  }, [blogData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to update the blog
      await axios.put(`http://localhost:3000/blog/${blogData.id}`, formData);

      // Upon successful completion, close the form
      onClose();
    } catch (error) {
      console.error("Error updating blog: ", error);
      // Handle the error as needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blog_title">
          Blog Title
        </label>
        <input
          type="text"
          id="blog_title"
          name="blog_title"
          value={formData.blog_title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blog_img">
          Blog Image URL
        </label>
        <input
          type="text"
          id="blog_img"
          name="blog_img"
          value={formData.blog_img}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blog_autor">
          Blog Author
        </label>
        <input
          type="text"
          id="blog_autor"
          name="blog_autor"
          value={formData.blog_autor}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blog_subdescription">
          Blog Subdescription
        </label>
        <textarea
          id="blog_subdescription"
          name="blog_subdescription"
          value={formData.blog_subdescription}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blog_description">
          Blog Description
        </label>
        <textarea
          id="blog_description"
          name="blog_description"
          value={formData.blog_description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* Add the remaining fields here */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-800 p-2 rounded-md mt-4 cursor-pointer mx-auto block"
        >
          Update Blog
        </button>
      </div>
    </form>
  );
};

export default UpdateBlog;
