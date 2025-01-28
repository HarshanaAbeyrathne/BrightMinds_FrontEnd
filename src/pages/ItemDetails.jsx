import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../component/Navbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await API.get(`/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item details:', error);
        toast.error('Failed to load item details');
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleAddToCart = async (id) => {
    try {
      // Assuming userId is available from authentication (e.g., stored in localStorage or context)
      const userId = localStorage.getItem('userId'); // Replace this with how you're storing the user ID in your app
  
      if (!userId) {
        toast.error('User is not logged in!');
        return;
      }
  
      const requestData = { userId, productId: id, quantity: 1 };
      console.log('Data being sent to the backend:', requestData);
  
      const response = await API.post('/api/cart/add', requestData);
      console.log('Response from backend:', response.data);
  
      toast.success(response.data.message || 'Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };
  
  

  const handleBuyNow = (id) => {
    // Placeholder for buy now logic
    toast.info('Buy Now functionality coming soon!');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-300 font-poppins">
      <Navbar />
      <ToastContainer />
      <div className="max-w-6xl mx-auto p-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-purple-600 hover:underline bg-white rounded-lg shadow-md px-4 py-2"
        >
          Back
        </button>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start">
          {/* Item Image and Additional Images */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <img
              src={`http://localhost:4000/${item.photo}`}
              alt={item.name}
              className="rounded-lg shadow-md mb-4 h-96 object-contain"
            />
            <div className="flex space-x-2">
              {item.additionalImages?.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000/${img}`}
                  alt={`Additional view ${index + 1}`}
                  className="w-16 h-16 rounded-md shadow-sm object-cover"
                />
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="w-full md:w-1/2 pl-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{item.name}</h1>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-yellow-500">★ {item.rating || 4.5}</span>
              <span className="text-sm text-gray-500">
                ({item.reviews || 0} reviews)
              </span>
            </div>
            <p className="text-xl font-semibold text-purple-700 mb-4">
              Rs. {item.price}
            </p>

            {/* Colors */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Colors:</p>
              <div className="flex space-x-2">
                {item.colors?.map((color, index) => (
                  <span
                    key={index}
                    className="w-8 h-8 rounded-full shadow-md"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </div>

            <p className="text-gray-600 mb-6">{item.description}</p>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
                onClick={() => handleAddToCart(item._id)}
              >
                Add To Cart
              </button>
              <button
                className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600"
                onClick={() => handleBuyNow(item._id)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">What's Included?</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>{item.metirial}</li>
            {item.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
