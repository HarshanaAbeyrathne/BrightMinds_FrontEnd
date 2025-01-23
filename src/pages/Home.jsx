import React from 'react'
import Navbar from '../component/Navbar'
import LatestItems from '../component/LatestItems'
import Footer from '../component/Footer';

function Home() {
  return (
    <div className='font-poppins '>
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-pink-300 '>
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-2/3 flex">
          <div className="text-white flex flex-col justify-center w-1/2 p-8">
            <h1 className="text-5xl font-bold mb-6">Empowering Young Minds for a Bright Future.</h1>
            <p className="mb-6">
              At Bright Minds, we are dedicated to unlocking the full potential of every child through innovative brain development techniques. Our mission is to empower young minds with the tools and knowledge they need to grow, learn, and thrive, shaping a brighter future for the next generation.
            </p>
            <div className="flex border-2 border-white rounded overflow-hidden">
              <input type="text" placeholder="Find the best brands" className="p-2 flex-grow" />
              <button className="bg-blue-500 hover:bg-blue-700 text-white p-2">
                Search
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <img src="../public/bg.png" alt="Child with a brain model" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </div>


    <div className="">
    <div className="container mx-auto p-8 text-center">
    <h2 className="text-blue-800">develop Your Child Brain to the future</h2>
    <h1 className="text-5xl font-bold mb-6">Our Latest Products</h1>
    </div>

    <LatestItems />
    </div>
    <Footer />
    </div>
  );
}

export default Home