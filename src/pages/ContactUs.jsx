import React from 'react';
import Navbar from '../component/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactUs() {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Form submitted successfully!', { position: "top-right", autoClose: 4000 });
    };

    return (
        <div className="font-poppins min-h-screen bg-gradient-to-br from-purple-400 to-pink-300 flex flex-col">
            <Navbar />
            <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label text-gray-700">Full Name</label>
                        <input type="text" placeholder="Enter your full name" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label text-gray-700">Email</label>
                        <input type="email" placeholder="Enter your email" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label text-gray-700">Subject</label>
                        <input type="text" placeholder="Enter subject" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label text-gray-700">Message</label>
                        <textarea placeholder="Enter your message" className="textarea textarea-bordered w-full h-32"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-4">Send Message</button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-700">📧 Email: contact@yourwebsite.com</p>
                    <p className="text-gray-700">📍 Address: 123 Main Street, Your City, Your Country</p>
                    <p className="text-gray-700">📞 Phone: +1 234 567 890</p>
                </div>
            </div>

            {/* Toast Container for Notifications */}
            <ToastContainer />
        </div>
    );
}

export default ContactUs;
