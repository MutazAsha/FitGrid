import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [planCount, setPlanCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/plans/count')
      .then(response => setPlanCount(response.data.count))
      .catch(error => console.error('Error fetching plans:', error));

    axios.get('http://localhost:8080/all_users')
      .then(response => setUserCount(response.data.length))
      .catch(error => console.error('Error fetching users:', error));

    axios.get('http://localhost:8080/getAllArticles')
      .then(response => setBlogCount(response.data.length))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div className="bg-[#f5f5f5] container flex justify-center items-center ">
    <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center  sm:max-w-3xl my-12 mx-4 sm:mx-8 md:gap-32 md:mr-32">
        {/* Plan Statistics */}
        <div className="p-4 w-[20rem] sm:w-[20rem] md:w-[20rem] lg:w-[20m]">
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110  bg-white">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="text-red-700 w-12 h-12 mb-3 inline-block"
              viewBox="0 0 24 24"
            >
              <path d="M8 17l4 4 4-4m-4-5v9" />
              <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
            </svg>
            <h2 className="title-font font-medium text-3xl text-gray-900">{planCount}</h2>
            <p className="leading-relaxed">Plan</p>
          </div>
        </div>

        {/* User Statistics */}
        <div className="p-4 w-[20rem] sm:w-[20rem] md:w-[20rem] lg:w-[20m]">
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 bg-white">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="text-red-700 w-12 h-12 mb-3 inline-block"
              viewBox="0 0 24 24"
            >
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx={9} cy={7} r={4} />
              <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
            </svg>
            <h2 className="title-font font-medium text-3xl text-gray-900">{userCount}</h2>
            <p className="leading-relaxed">Users</p>
          </div>
        </div>

        {/* Blog Statistics */}
        <div className="p-4 w-[20rem] sm:w-[20rem] md:w-[20rem] lg:w-[20m]">
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 bg-white">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="text-red-700 w-12 h-12 mb-3 inline-block"
              viewBox="0 0 24 24"
            >
              <path d="M3 18v-6a9 9 0 0118 0v6" />
              <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
            </svg>
            <h2 className="title-font font-medium text-3xl text-gray-900">{blogCount}</h2>
            <p className="leading-relaxed">Blog</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
