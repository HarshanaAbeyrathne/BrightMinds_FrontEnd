import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../component/Navbar';
import DisplayAllItems from '../component/DisplayAllItems';

function AllItems() {
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const location = useLocation(); // React Router hook to get current location

  useEffect(() => {
    const fetchTypeFromUrl = () => {
      const params = new URLSearchParams(location.search);
      const typeParam = params.get('type');
      setType(typeParam || 'All Items'); // Default to "All Items" if no type is provided
    };

    fetchTypeFromUrl();
    setLoading(false); // Stop loading after the type is fetched
  }, [location]);

  return (
    <div className="font-poppins">
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-pink-300">
        <Navbar />
        <h1 className="text-center p-4 text-lg font-bold">
          {loading ? 'Loading...' : type}
        </h1>
        <DisplayAllItems type={type} /> {/* Pass type as a prop */}
      </div>
    </div>
  );
}

export default AllItems;
