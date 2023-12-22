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
    return <p className="text-center text-gray-500 text-xl mt-4">Loading...</p>;
  }

  return (
    <div className=" p-8 bg-gray-100 mt-24">
      <div className="md:flex items-center justify-center mb-8">
        <div className="md:shrink-0 mr-6">
          <img
            className="h-64 w-full object-cover md:h-full md:w-64 rounded-md border-4"
            src={trainer.profileimage}
            alt={`Image of ${trainer.username}`}
          />
        </div>
        <div className="md:ml-6 mt-4 md:mt-0">
          <h2 className="text-4xl font-extrabold hover:underline text-red-700">
            Name: {trainer.username}
          </h2>
          <div className="uppercase tracking-wide text-lg font-semibold mt-2">
            Certification: {trainer.certification}
          </div>
          <p className="mt-2 text-gray-600 text-lg">
            Experience: {trainer.experience} years
          </p>
        </div>
      </div>
      <Pricing />
      
      <div className="text-center py-4 ">
        <Link
          to="/trainers"
          className="inline-block text-sm px-4 py-2 leading-none border rounded-md bg-red-700 text-white border-red-700 hover:border-transparent hover:text-white hover:bg-gray-800"
        >
          &larr; Back to Trainers
        </Link>
      </div>
    </div>
  );
};

export default TrainerDetails;
