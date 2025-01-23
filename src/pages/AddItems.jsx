import React, { useState } from 'react';
import AdminNavbar from '../component/AdminNavbar'

function AddItems() {

    const [item, setItem] = useState({
        name: '',
        price: '',
        description: '',
        material: '',
        stock: '',
        photo: null
      });
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'photo') {
          setItem({ ...item, photo: e.target.files[0] });
        } else {
          setItem({ ...item, [name]: value });
        }
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', item.name);
        formData.append('price', item.price);
        formData.append('description', item.description);
        formData.append('material', item.material);
        formData.append('stock', item.stock);
        formData.append('photo', item.photo);
    
        // Example: Post data to your server endpoint
        fetch('http://localhost:4000/api/items/add', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
      };
      
  return (
    <div className='font-poppins '>
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-pink-300 '>
        <AdminNavbar />
        <div className="max-w-xl mx-auto bg-base-100 shadow-xl rounded-lg p-5">
        <form onSubmit={handleSubmit} className="form-control">
          <label className="label">
            <span className="label-text">Name:</span>
          </label>
          <input type="text" name="name" value={item.name} onChange={handleChange} className="input input-bordered w-full" />

          <label className="label">
            <span className="label-text">Price:</span>
          </label>
          <input type="text" name="price" value={item.price} onChange={handleChange} className="input input-bordered w-full" />

          <label className="label">
            <span className="label-text">Description:</span>
          </label>
          <input type="text" name="description" value={item.description} onChange={handleChange} className="input input-bordered w-full" />

          <label className="label">
            <span className="label-text">Material:</span>
          </label>
          <input type="text" name="material" value={item.material} onChange={handleChange} className="input input-bordered w-full" />

          <label className="label">
            <span className="label-text">Stock:</span>
          </label>
          <input type="number" name="stock" value={item.stock} onChange={handleChange} className="input input-bordered w-full" />

          <label className="label">
            <span className="label-text">Photo:</span>
          </label>
          <input type="file" name="photo" onChange={handleChange} className="input input-bordered w-full" />

          <button type="submit" className="btn btn-primary mt-4">Add Item</button>
        </form>
      </div>
        
    </div>
    </div>
  )
}

export default AddItems