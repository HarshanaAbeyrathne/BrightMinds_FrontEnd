import React, { useState, useEffect } from 'react';
import AdminNavbar from '../component/AdminNavbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RemoveItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch items from the backend
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:4000/api/items/')
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch items');
        setLoading(false);
      });
  }, []);

  // Handle delete item with confirmation
  const handleDelete = (id) => {
    // Confirmation dialog
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`http://localhost:4000/api/items/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setItems(items.filter(item => item._id !== id));
          toast.success('Item successfully deleted!');
        } else {
          throw new Error('Failed to delete the item');
        }
      })
      .catch(error => {
        setError(error.message);
        toast.error(`Error: ${error.message}`);
      });
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className='font-poppins '>
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-pink-300 '>
        <AdminNavbar />
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold text-center mb-4">Remove Items</h1>
      <ul>
        {items.map(item => (
          <li key={item._id} className="flex items-center justify-between p-2 border-b border-gray-300 bg-white bg-opacity-10">
            <div className="flex items-center">
              <img src={`http://localhost:4000/${item.photo}`} alt={item.name} className="w-20 h-20 mr-4 object-cover" />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
            <button className="btn btn-error btn-xs" onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
    </div>
    </div>
  );
}

export default RemoveItems;
