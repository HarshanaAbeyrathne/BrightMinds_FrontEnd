import React, { useState } from 'react';
import API from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {

        console.log("handleSubmit called");

        e.preventDefault();

        try {
            const { data } = await API.post('/api/user/register', { name, age, email, mobile, password });
            // console.log("API response data:", data);

            // toast.success('Registration successful');
            
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            localStorage.setItem('token', data.token);
        
            window.location.href = '/';
        } catch (error) {
            const errorMsg = error.response?.data?.error || "An error occurred";
            toast.error(errorMsg);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-300 font-poppins">
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Create an Account</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h2 className="font-semibold text-lg text-gray-700">Guardian</h2>
                            <input className="w-full p-2 border border-gray-300 rounded mt-2" placeholder="Name" type="text" onChange={e => setName(e.target.value)} />
                            <input className="w-full p-2 border border-gray-300 rounded mt-2" placeholder="Age" type="number" onChange={e => setAge(e.target.value)} />
                            <input className="w-full p-2 border border-gray-300 rounded mt-2" placeholder="Email" type="email" onChange={e => setEmail(e.target.value)} />
                            <input className="w-full p-2 border border-gray-300 rounded mt-2" placeholder="Mobile" type="text" onChange={e => setMobile(e.target.value)} />
                            <input className="w-full p-2 border border-gray-300 rounded mt-2" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg text-gray-700">Child</h2>
                            <input className="w-full p-2 border border-gray-300 rounded mt-2" placeholder="Name" type="text" />
                            <input className="w-full p-2 border border-gray-300 rounded mt-2" placeholder="Age" type="number" />
                            <select className="w-full p-2 border border-gray-300 rounded mt-2">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <input className="w-full p-2 border border-gray-300 rounded mt-2" placeholder="Date Of Birth" type="date" />
                            <input className="w-full p-2 border border-gray-300 rounded mt-2" placeholder="Address" type="text" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline" type="submit">
                            Create Account
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    Already Have an Account? <a href="/login" className="text-purple-500 hover:text-purple-800">Log in</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
