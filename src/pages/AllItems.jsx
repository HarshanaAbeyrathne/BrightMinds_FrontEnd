import React from 'react'
import Navbar from '../component/Navbar';
import DisplayAllItems from '../component/DisplayAllItems';

function AllItems() {
  return (
    <div className='font-poppins'>
        <div className='min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-pink-300'>
            <Navbar />
            <h1 className='text-center p-4 text-larg'>All Items</h1>
            <DisplayAllItems />
        </div>
    </div>
  )
}

export default AllItems