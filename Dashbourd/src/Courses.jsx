import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/Corse')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (courseId) => {
    setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));

    axios.put(`http://localhost:3000/Corse/${courseId}`)
      .then(response => {
        console.log('Course deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting course:', error);
        // Note: You may consider removing the axios.get here, as it fetches the data again after deletion
      });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center">
      <div className="overflow-auto rounded-lg shadow w-full sm:max-w-3xl my-12 mx-4 sm:mx-8">
        <table className="w-full bg-[#f5f5f5] table-auto">
          <thead className="bg-red-700 text-white">
          <tr>
            <th className="py-2 px-4">Course Name</th>
            <th className="py-2 px-4">Course Category</th>
            <th className="py-2 px-4">Course Duration</th>
            <th className="py-2 px-4">Pricing</th>
            <th className="py-2 px-4">Course Description</th>
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr
              key={index}
              className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : ''}`}
            >
              <td className="py-2 px-4">
            
                {course.Course_Name}
           
              </td>
              <td className="py-2 px-4">
              
                 {course.Course_Category}
           
              </td>
              <td className="py-2 px-4">
              
                 {course.Course_Duration}
                 
              </td>
              <td className="py-2 px-4">
                
                {course.Pricing}
                 
              </td>
              <td className="py-2 px-4">
               {course.Course_description}
                 
      
              </td>
              <td className="py-2 px-4">
              {course.image}
              </td>
              <td className="py-2 px-4 flex justify-end">
                <button
                  type="button"
                  className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Courses;