import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Navbar from '../component/Navbar';

function Cart() {
  const [cart, setCart] = useState(null); // Store the cart object
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem('userId'); // Get userId from localStorage

      if (!userId) {
        setError('User not logged in!');
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(`/api/cart/${userId}`);
        setCart(response.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Failed to fetch cart data');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await API.post('/api/cart/remove', { userId, productId });
      setCart(response.data); // Update cart after removing item
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await API.post('/api/cart/update', {
        userId,
        productId,
        quantity: newQuantity,
      });
      setCart(response.data); // Update cart state after the change
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const handleProceedToPayment = () => {
    // Redirect to payment page or initiate payment
    window.location.href = `/payment?totalAmount=${cart.totalPrice}`;
    
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="font-poppins min-h-screen  flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-pink-300">
        <Navbar />
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
            alt="Empty Cart"
            className="w-40 h-40 mx-auto mb-6"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          {/* <button
            onClick={() => window.location.href = '/shop'} // Redirect to your shopping page
            className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
          >
            Start Shopping
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="font-poppins">
      <div className="min-h-screen  flex-col bg-gradient-to-br from-purple-400 to-pink-300">
        <Navbar />
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {cart.items.map((item, index) => (
              <div
                key={item.productId._id || index}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={`http://localhost:4000/${item.productId.photo}`}
                    alt={item.productId.name}
                    className="w-16 h-16 rounded-lg shadow-sm mr-4 object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.productId.name}
                    </h2>
                    <span>Amount: {item.quantity}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-800">
                    Rs. {item.productId.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.productId._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded shadow-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total Price */}
            <div className="text-right mt-6">
              <h2 className="text-xl font-bold text-gray-800">
                Total Price: Rs. {cart.totalPrice}
              </h2>
              <button
                onClick={handleProceedToPayment}
                className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
