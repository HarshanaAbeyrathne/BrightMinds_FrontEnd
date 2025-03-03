import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

function ItemSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [type, setType] = useState('');
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [error, setError] = useState('');

    const itemTypes = [
        'Baby Toys',
        'Bikes, Rockers, Walkers',
        'Educational Toys',
        'Musical Toys',
        'Games',
        'Puzzles'
    ];

    const navigate = useNavigate();

    // Function to fetch items based on selected type
    const fetchItems = async () => {
        if (type) {
            try {
                const response = await API.get(`/api/items?type=${type}`);
                setItems(response.data);
                setFilteredItems(response.data);  // Initially display all items in category
                setError('');
            } catch (error) {
                console.error('Failed to fetch items:', error);
                setError('Failed to load items');
            }
        }
    };

    // Effect to fetch items when type changes
    useEffect(() => {
        fetchItems();
    }, [type]);

    // Effect to filter items when search query changes
    useEffect(() => {
        if (searchQuery) {
            const filtered = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredItems(filtered);
        } else {
            setFilteredItems(items);  // Reset to all items in the category if search query is cleared
        }
    }, [searchQuery]);

    return (
        <div className='font-poppins'>
            <div className='min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-pink-300'>
                <Navbar />
                <div className='max-w-md mx-auto p-8'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                    }} className="space-y-4">
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="">Select a category</option>
                            {itemTypes.map((itemType, index) => (
                                <option key={index} value={itemType}>{itemType}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </form>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {filteredItems.map((item) => (
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
                                <button className="btn bg-secondary text-white hover:bg-pink-500 hover:text-white"
                                onClick={() => navigate(`/payment?totalAmount=${item.price}`)}>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ItemSearch;
