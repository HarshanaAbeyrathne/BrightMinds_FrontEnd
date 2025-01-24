import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../component/Navbar';
import { useNavigate } from 'react-router-dom';

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await API.get(`/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div className='font-poppins'>
        <div className='min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-pink-300'>
        <Navbar />
        <button onClick={() => navigate(`/items`)}>Back</button>
    <div className="item-details p-4">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <img
        src={`http://localhost:4000/${item.photo}`}
        alt={item.name}
        className="rounded-lg shadow-xl h-96 object-cover mt-4"
      />
      <p className="text-xl mt-4">Price: Rs. {item.price}</p>
      <p className="mt-2">{item.description}</p>
    </div>
    </div>
    </div>
  );
}

export default ItemDetails;
