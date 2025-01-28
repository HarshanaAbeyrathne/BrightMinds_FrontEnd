import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/api/user/login', { email, password });
            console.log(data);
            alert('Login successful');
            // Optionally set the user data in global state/context or local storage
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userId', data.userId);

            // Redirect to the dashboard page
            if (data.role === 'admin') {
                navigate('/admin');
                // console.log('Admin login successful');
            }
            if (data.role === 'user') {
                navigate('/');
                // console.log('User login successful');
            };
        } catch (error) {
            console.error(error.response?.data || "An error occurred");
            alert('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-300 font-poppins">
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">Welcome Back!</h2>
                <p className="text-center text-gray-500 text-sm mb-6">Let's continue where you left off <br /> and achieve more together.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-center">
                        <label className="block text-gray-700 text-xl font-bold mb-2 font-light" htmlFor="username">
                            Email
                        </label>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2"/>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="email"
                                id="username"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-6 text-center">
                        <label className="block text-gray-700 text-xl font-bold mb-2 font-light" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2"/>
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <p>Don't have an account?</p>
                        <a className="text-purple-500 hover:text-purple-800 text-sm" href="/register">Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
