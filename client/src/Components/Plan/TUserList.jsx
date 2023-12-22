import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data when the component mounts
    axios.get('https://api.example.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
      <div className=" rounded-lg overflow-hidden  mx-auto my-8 max-w-screen-md">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-gray-700">User Accounts</h2>
            <span className="text-xs text-gray-500">
              View accounts of registered users
            </span>
          </div>
          <div className="flex items-center justify-between">
            {/* Your additional buttons or components can go here */}
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-red-700 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Full Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Created at</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-5 py-3">{user.id}</td>
                    <td className="px-5 py-3">{user.fullName}</td>
                    <td className="px-5 py-3">{user.email}</td>
                    <td className="px-5 py-3">{user.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm">
              {" "}
              Showing 1 to 5 of {users.length} Entries{" "}
            </span>
            <div className="mt-2 inline-flex sm:mt-0">
              <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Prev
              </button>
              <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TUserList;
