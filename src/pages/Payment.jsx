import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../component/Navbar';
import API from '../api/axios'; // Import your Axios instance

function Payment() {
  const location = useLocation();
  const totalAmount = new URLSearchParams(location.search).get('totalAmount'); // Get totalAmount from URL
  // const getOneItemAmount = new URLSearchParams(location.search).get('getOneItemAmount');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleClearCart = async () => {
    const userId = localStorage.getItem('userId');
    try {
      await API.post('/api/cart/clear', { userId });
      console.log('Cart cleared successfully');
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    // Simulate payment success
    await handleClearCart(); // Clear the cart after payment
    setPaymentSuccess(true);
  };

  if (paymentSuccess) {
    return (
      <div className="font-poppins min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-300">
        <Navbar />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Payment Successful</h1>
          <p className="text-white text-lg mb-6">
            Your payment of Rs. {totalAmount} has been processed successfully, and your cart has been cleared!
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="Success"
            className="w-40 h-40 mx-auto"
          />
          <button
            onClick={() => window.location.href = '/'} // Redirect to home or another page
            className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-poppins min-h-screen bg-gradient-to-br from-purple-400 to-pink-300">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Details</h1>
        <p className="text-lg text-gray-600 mb-4">
          Total Amount: <span className="font-semibold">Rs. {totalAmount}</span>
        </p>
        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
