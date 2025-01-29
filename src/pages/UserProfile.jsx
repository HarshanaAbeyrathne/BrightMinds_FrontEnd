import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Navbar from '../component/Navbar';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');

            if (!userId || !token) {
                setError('User not authenticated.');
                setLoading(false);
                return;
            }

            try {
                const response = await API.get(`/api/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Failed to load user profile');
            }
            setLoading(false);
        };

        fetchUser();

        // Fetch progress data from local storage
        const savedProgress = JSON.parse(localStorage.getItem('todoProgress')) || [];
        setProgressData(savedProgress);
    }, []);

    if (loading) return <p className="text-center">Loading user details...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const milestones = [
        "6 weeks to 3 Months", "3 – 6 Months", "6 – 9 Months", "18 Months – 2 years",
        "2 years – 3 years", "3 years – 4 years", "4 years – 5 years"
    ];

    const calculateProgress = (group) => {
        if (!group || group.length === 0) return 0;
        const completedTasks = group.filter(item => item).length;
        return Math.round((completedTasks / group.length) * 100);
    };

    return (
        <div className="font-poppins min-h-screen flex-col bg-gradient-to-br from-purple-400 to-pink-300">
            <Navbar />
            <h1 className="text-center text-2xl font-bold">User Profile</h1>
            <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
            </div>

            {/* Progress Section */}
            <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-lg font-semibold text-center pb-4">Child Progress</h2>
                {milestones.map((milestone, index) => (
                    <div key={index} className="mb-7">
                        <p className="font-bold">{milestone}</p>
                        <div className="w-full bg-gray-300 rounded h-4">
                            <div
                                className="h-4 bg-green-500 rounded"
                                style={{ width: `${calculateProgress(progressData[index] || [])}%` }}
                            ></div>
                        </div>
                        <p className="text-sm">{calculateProgress(progressData[index] || [])}% Completed</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserProfile;
