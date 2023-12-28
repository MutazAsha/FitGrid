import React from 'react';
import Users from './Users';
import Blogs from './Blogs';
import Courses from './Courses';
import ContactUs from './Contactus';
import Statistics from './Statistics';
import Category from './Category';
import WorkoutPage from './Workout';
import FAQ from './FAQ';
import JoinOurTeam from './JoinOurTeam';

const Dashboard = () => {
  return (
<div className="text-gray-700 body-font overflow-x-hidden">
  <Statistics />
  <div className="container mx-auto mb-32 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24">
    <h1 className="text-[#22092C] text-4xl font-bold text-center mb-8 ml-0 sm:ml-16">Management Users</h1>
    <Users />
    <hr className="my-8" />
    <h1 className="text-[#22092C] text-4xl font-bold text-center mb-4 ml-0 sm:ml-16">Management Blogs</h1>
    <Blogs />
    <hr className="my-8" />
    <h1 className="text-[#22092C] text-4xl font-bold text-center mb-4 ml-0 sm:ml-16">Management Plans</h1>
    <Courses />
    <hr className="my-8" />
    <h1 className="text-[#22092C] text-4xl font-bold text-center mb-4 ml-0 sm:ml-16">Management Contact Us</h1>
    <ContactUs />
    <hr className="my-8" />
    <h1 className="text-[#22092C] text-4xl font-bold text-center mb-4 ml-0 sm:ml-16">Management Categories</h1>
    <Category />
    <hr className="my-8" />
    <h1 className="text-[#22092C] text-4xl font-bold text-center mb-4 ml-0 sm:ml-16">Management Workout</h1>
    <WorkoutPage />
    <hr className="my-8" />
    <h1 className="text-[#22092C] text-4xl font-bold text-center mb-4 ml-0 sm:ml-16">Management FAQ</h1>
    <FAQ />
    <hr className="my-8" />
    <h1 className="text-[#22092C] text-4xl font-bold text-center mb-4 ml-0 sm:ml-16">Management Join Team</h1>
    <JoinOurTeam />
  </div>
</div>

  );
};

export default Dashboard;
