import React from 'react';
import Navbar from '../component/Navbar';

function AboutUs() {
    return (
        <div className="font-poppins min-h-screen bg-gradient-to-br from-purple-400 to-pink-300 flex flex-col">
            <Navbar />
            <div className="max-w-5xl mx-auto mt-10 ">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 text-white">About Us</h1>
                <div className="flex flex-col md:flex-row items-center ">
                    {/* Left Section - Text */}
                    <div className="md:w-1/2 ">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-white">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed mb-6 text-white">
                            At Bright Minds, we believe every child has the potential to achieve greatness. 
                            Through our innovative approaches, we strive to provide resources and tools that 
                            help children unlock their full capabilities.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-white">What We Do</h2>
                        <p className="text-gray-700 leading-relaxed text-white">
                            We focus on delivering brain development programs, interactive activities, 
                            and engaging educational content that fosters growth, creativity, and learning. 
                            By working closely with families and educators, we aim to shape brighter futures 
                            for the next generation.
                        </p>
                    </div>

                    {/* Right Section - Image */}
                    <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
                        <img
                            src="../public/bg.png"
                            alt="Bright Minds About Us"
                            className="rounded-lg"
                        />
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center text-white">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div className="bg-purple-100 p-4 rounded-lg shadow">
                            <h3 className="text-xl font-semibold text-purple-700">Innovative Programs</h3>
                            <p className="text-gray-700 mt-2">
                                Cutting-edge techniques designed to enhance children's cognitive and emotional development.
                            </p>
                        </div>
                        <div className="bg-purple-100 p-4 rounded-lg shadow">
                            <h3 className="text-xl font-semibold text-purple-700">Expert Guidance</h3>
                            <p className="text-gray-700 mt-2">
                                Our team of specialists and educators provide insights and support to families.
                            </p>
                        </div>
                        <div className="bg-purple-100 p-4 rounded-lg shadow">
                            <h3 className="text-xl font-semibold text-purple-700">Community Impact</h3>
                            <p className="text-gray-700 mt-2">
                                Helping children succeed means a brighter future for our communities and beyond.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
