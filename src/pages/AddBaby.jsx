import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import API from '../api/axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddBaby() {
  const [name, setName] = useState('');
  const [ageRange, setAgeRange] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting", { name, ageRange });

    const userId = localStorage.getItem('userId');
    const url = `http://localhost:4000/api/user/${userId}/baby`;

    try {
      const response = await API.post(url, { name, ageRange });
      console.log('Baby added successfully:', response.data);
    //   toast.success(`${name} Welcome to the world, little one!`);
    toast.success(`🌟 Welcome, ${name}! May your journey be filled with love, laughter, and endless joy!`);

    } catch (error) {
      console.error('Error adding baby:', error);
      toast.error('Failed to add baby');
    }
  };

  return (
    <div className="font-poppins min-h-screen flex flex-col items-center  bg-gradient-to-br from-purple-400 to-pink-300">
      <Navbar />
      <ToastContainer />
      <h1 className="text-center text-2xl font-bold mb-6">Enter Baby Details</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Baby's Name"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ageRange">
            Age Range
          </label>
          <select
            id="ageRange"
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Age Range</option>
            <option value="1">6 weeks to 3 Months</option>
            <option value="2">3 – 6 Months</option>
            <option value="3">6 – 9 Months</option>
            <option value="4">18 Months – 2 years</option>
            <option value="5">2 years – 3 years</option>
            <option value="6">3 years – 4 years</option>
            <option value="7">4 years – 5 years</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Baby
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBaby;