import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Pricing from './Pricing';

const TrainerDetails = () => {
  const [trainer, setTrainer] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getTrainerById/${id}`);
        setTrainer(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trainer details: ', error);
        setLoading(false);
      }
    };

    fetchTrainerDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="container mx-auto my-24 p-4 md:p-8 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 rounded-md shadow-md text-white">
      <div className="md:flex items-center justify-center">
        <div className="md:shrink-0 ml-8 ">
          <img
            className="h-64 w-full object-cover md:h-full md:w-64 rounded-md"
            src={trainer.profileimage}
            alt={`Image of ${trainer.username}`}
          />
        </div>
        <div className="md:ml-8 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold hover:underline">
            Name: {trainer.username}
          </h2>
          <div className="uppercase tracking-wide text-sm text-teal-300 font-semibold mt-2">
            {trainer.certification}
          </div>
          <p className="mt-2 text-gray-200 text-lg">
            {trainer.experience}
          </p>
        </div>
      </div>
      <Pricing />
      <div className=" text-white text-center py-2 mt-8">
        <Link to="/trainers" className="text-sm font-medium hover:underline">
          &larr; Back to Trainers
        </Link>
      </div>
    </div>
  );
};

export default TrainerDetails;
