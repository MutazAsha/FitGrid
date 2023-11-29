// Blog.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import UpdateBlog from "../UpdateBlog";
import BlogForm from "../BlogForm";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [updateBlogData, setUpdateBlogData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blog");
        setBlogs(response.data.map(blog => ({
          article_id: blog.article_id,
          articles_image: blog.articles_image,
          title: blog.blog_title,
          content: blog.blog_subdescription,
          isdeleted: blog.isdeleted
        })));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastBlog = currentPage * 6;
  const indexOfFirstBlog = indexOfLastBlog - 6;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / 6);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdate = (blogId) => {
    const blogToUpdate = blogs.find((blog) => blog.article_id === blogId);
    setUpdateBlogData(blogToUpdate);
    setShowPopup(true);
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:3000/blog/${blogId}`);
      setDeleteMessage("Blog deleted successfully.");

      // Refetch the data after successful deletion
      const response = await axios.get("http://localhost:3000/blog");
      setBlogs(response.data.map(blog => ({
        article_id: blog.article_id,
        articles_image: blog.articles_image,
        title: blog.blog_title,
        content: blog.blog_subdescription,
        isdeleted: blog.isdeleted
      })));
    } catch (error) {
      console.error("Error deleting blog: ", error);
      setDeleteMessage("Error deleting blog. Please try again.");
    } finally {
      // Close the confirmation popup after a delay or based on user interaction
      setTimeout(() => {
        setShowPopup(false);
        setDeleteMessage("");
      }, 3000);
    }
  };

  const handleAdd = () => {
    setUpdateBlogData(null);
    setShowPopup(true);
  };

  return (
    <div className="ml-44 my-16">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1 className="text-gray-800 text-4xl mb-6 font-bold text-center">My Blog</h1>
        {/* Display delete confirmation message */}
        {deleteMessage && <p className="text-green-500">{deleteMessage}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 my-4 items-end justify-end">
          {currentBlogs.map((blog) => (
            <div key={blog.article_id} className="bg-white rounded-md overflow-hidden shadow-lg w-[20rem]">
              <Link to="#">
                <img src={blog.articles_image} alt="" className="w-full h-40 object-cover" />
              </Link>
              <div className="p-4 w-[20rem]">
                <Link to="#">
                  <h5 className="w-[20rem] mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {blog.title}
                  </h5>
                </Link>
                <p className="w-[20rem] mb-3 text-sm text-gray-700 dark:text-gray-400">
                  {blog.content}
                </p>
                <Link
                  to={`/blog-details/${blog.article_id}`}
                  className="inline-block px-4 py-2 text-sm font-bold text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
                >
                  Read More
                </Link>

                <button
                  onClick={() => handleUpdate(blog.article_id)}
                  className="inline-block px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none ml-2"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(blog.article_id)}
                  className="inline-block px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-full flex justify-center mt-4">
          <button
            className="mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full ${
                currentPage === number ? "bg-gray-800" : ""
              }`}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            >
              {number}
            </button>
          ))}
          <button
            className="mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* Add Button to Trigger Popup */}
        <button
  className="fixed bottom-8 right-8 p-4 bg-gray-900 text-white rounded-full hover:bg-gray-600 focus:outline-none"
  onClick={handleAdd}  
>
  Add Blog
</button>

        {/* Popup */}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-lg w-96">
              {/* Display the content of BlogForm or UpdateBlogForm based on updateBlogData */}
              {updateBlogData ? (
                <UpdateBlog
                  onClose={() => setShowPopup(false)}
                  blogData={updateBlogData}
                />
              ) : (
                <BlogForm onClose={() => setShowPopup(false)} />
              )}

              {/* Add a close button */}
              <button
                className=" p-3 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none mb-10"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
