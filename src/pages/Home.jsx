import React from 'react'
import Navbar from '../component/Navbar'
import LatestItems from '../component/LatestItems'
import Footer from '../component/Footer'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='font-poppins'>
      <div className='min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-pink-300'>
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-2/3 flex">
            <div className="text-white flex flex-col justify-center w-1/2 p-8">
              <h1 className="text-5xl font-bold mb-6">Empowering Young Minds for a Bright Future.</h1>
              <p className="mb-6">
                At Bright Minds, we are dedicated to unlocking the full potential of every child through innovative brain development techniques. Our mission is to empower young minds with the tools and knowledge they need to grow, learn, and thrive, shaping a brighter future for the next generation.
              </p>
             
                <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">
                  <Link to="/search">Search</Link>
                </button>

            </div>
            <div className="w-1/2">
              <img src="../public/bg.png" alt="Child with a brain model" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Products Section */}
      <div className="">
        <div className="container mx-auto p-8 text-center">
          <h2 className="text-blue-800">Develop Your Child's Brain for the Future</h2>
          <h1 className="text-5xl font-bold mb-6">Our Latest Products</h1>
        </div>

        <LatestItems />

        <div className='text-center mt-10'>
          <button className="btn btn-info">View More</button>
        </div>
      </div>

      {/* Testimonials Section */}
<div className="bg-white py-12">
  <p className="text-center text-blue-800 mb-2">Here are some of the best clients.</p>
  <h1 className="text-center text-4xl font-bold mb-8">What People Say About Us</h1>
  <div className="container mx-auto flex justify-center space-x-4">
    <div className="bg-pink-100 rounded-lg shadow-lg p-6 max-w-sm">
      <div className="flex items-center space-x-4">
        <img
          src="../public/Anya.png"
          alt="Ananya Perera"
          className="w-20 h-20 object-cover rounded-full"
        />
        <div>
          <h3 className="text-lg font-bold">Ananya Perera</h3>
          <p className="text-sm">
            Bright Minds has been a game-changer for my child! The activities are engaging, and I've seen remarkable improvements in creativity and problem-solving. Highly recommend!
          </p>
        </div>
      </div>
      <p className="text-yellow-500 mt-4 ml-24">★★★★★</p>
    </div>
    <div className="bg-pink-100 rounded-lg shadow-lg p-6 max-w-sm">
      <div className="flex items-center space-x-4">
        <img
          src="../public/meera.png"
          alt="Meera Fernando"
          className="w-20 h-20 object-cover rounded-full"
        />
        <div>
          <h3 className="text-lg font-bold">Meera Fernando</h3>
          <p className="text-sm">
            Bright Minds has truly enhanced my child's learning experience. The activities are fun and effective!
          </p>
        </div>
      </div>
      <p className="text-yellow-500 mt-4 ml-24">★★★★★</p>
    </div>
  </div>
  <div className="flex justify-center mt-6">
    <div className="flex space-x-2">
      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
    </div>
  </div>
</div>

{/* Newsletter Section */}
<div className="bg-gray-100 py-12">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
    <div className="text-center md:text-left ml-64">
      <h2 className="text-2xl font-bold mb-2 ">Subscribe To Newsletter</h2>
      <p className="text-sm mb-4">Get a free guide about your child's brain development.</p>
      <div className="flex">
        <input
          type="email"
          placeholder="Enter Email Address"
          className="p-3 border rounded-l w-full md:w-auto"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-r">
          Subscribe
        </button>
      </div>
    </div>
    <div className="mt-6 md:mt-0 mr-64">
      <img
        src="../public/SubChild.png"
        alt="Child playing with blocks"
        className="w-64 h-auto rounded-md shadow-md"
      />
    </div>
  </div>
</div>



      <Footer />
    </div>
  )
}

export default Home
