import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function DisplayAllItems({ type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true); // Start loading
      try {
        const response = await API.get('/api/items/', {
          params: { type }, // Pass type as a query parameter to the backend
        });
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
        setItems([]); // Reset items on error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (type) {
      fetchItems();
    }
  }, [type]);

  if (loading) {
    return <p className="text-center p-4">Loading items...</p>;
  }

  if (items.length === 0) {
    return (
      <p className="text-center p-4 text-red-500">
        Sorry, no items are available for "{type}" at the moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <div
          key={item._id}
          className="card bg-gray-200 shadow-xl rounded-lg overflow-hidden w-full md:w-96"
        >
          <figure className="px-10 pt-10">
            <img
              src={`http://localhost:4000/${item.photo}`}
              alt={item.name}
              className="rounded-xl h-48 w-full object-cover cursor-pointer"
              onClick={() => navigate(`/items/${item._id}`)}
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{item.name}</h2>
            <p>Rs. {item.price}</p>
            <button className="btn bg-secondary text-white hover:bg-pink-500 hover:text-white">
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayAllItems;
