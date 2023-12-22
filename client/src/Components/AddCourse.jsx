import React, { useState } from 'react';
import axios from 'axios';

const AddTrainingCoursePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    duration: '',
    price: '',
    description: '',
    features: '',
    image: null,
  });

  const { name, category, duration, price, description,features, image } = formData;

  const Category = ['Fitness', 'Grossfit', 'Cardio', 'Body Building'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevFormData) => ({ ...prevFormData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('duration', duration);
      formData.append('price', price);
      formData.append('description', description);
formData.append('features', features);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('http://localhost:8080/createPlan', formData, {
        
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // You can perform further processing here as needed

      console.log('Training course data sent:', response.data);
    } catch (error) {
      console.error('An error occurred while sending data:', error.message);
    }
  };

  return (
    <div className="BlogForm bg-white p-8 rounded-lg ">
      <h2 className="text-3xl font-semibold mb-6 text-red-700 text-center">Create a New Plan</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="w-full">
          <label className="block mb-2 text-sm font-bold text-gray-600 text-center" htmlFor="name">
            Course Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="w-full">
          <label className="block mb-2 text-sm font-bold text-gray-600 text-center" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="" disabled>Select a Category</option>
            {Category.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block mb-2 text-sm font-bold text-gray-600 text-center" htmlFor="duration">
           Duration
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={duration}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="w-full">
          <label className="block mb-2 text-sm font-bold text-gray-600 text-center" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="w-full">
          <label className="block mb-2 text-sm font-bold text-gray-600 text-center" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="w-full">
          <label className="block mb-2 text-sm font-bold text-gray-600 text-center" htmlFor="features">
          features
          </label>
          <textarea
            id="features"
            name="features"
            value={features}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-red-700"
          />
        </div>
<br></br>
      <button
          type="submit"
          className="bg-black text-white hover:bg-gray-800 p-2 rounded-md mt-4 cursor-pointer mx-auto block w-20 h-10"
        >
          Add Plan
        </button>

      </form>
    </div>
  );
};

export default AddTrainingCoursePage;
