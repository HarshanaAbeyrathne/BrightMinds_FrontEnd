import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function DisplayAllItems() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await API.get('/api/items/');
            setItems(response.data);
          } catch (error) {
            console.error("Failed to fetch items:", error);
          }
        };
    
        fetchItems();
      }, []);

  return (
        <div className="grid grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <div key={item._id} className="card bg-gray-200 shadow-xl rounded-lg overflow-hidden w-96">
          <figure className="px-10 pt-10">
            <img
              src={`http://localhost:4000/${item.photo}`}
              alt={item.name}
              className="rounded-xl h-48 w-full object-cover" // Tailwind classes for image
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
  )
}

export default DisplayAllItems